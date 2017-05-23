<?php

namespace App\Http\Controllers;
// namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Auth;
use App\Chat;
use App\User;
use App\Friendship;
use App\UsersInChat;
use App\Events\UserEvents;

class FriendController extends Controller
{
    public function searchNewFriend($letters = null)
    {   
        $user = Auth::user();
        $friends = Friendship::getList();
        $requests = Friendship::getListFriendrequest();  // non-confirmed friends (friendrequest)
        $disabledIDs = array();
        //DON'T FIND YOURSELF AND FRIENDS
        array_push($disabledIDs, $user->id);
        foreach ($friends as $key => $friend) {
            array_push($disabledIDs, $friend->id);
        }
        foreach ($requests as $key => $request) {
            array_push($disabledIDs, $request->id);
        }
        
        //ONLY RETURN NON-FRIEND USERS
        if ($letters) {
            return User::whereNotIn('id', $disabledIDs )->where('name', 'LIKE', '%'.$letters.'%')->orderBy('id','asc')->take(20)->select('name', 'id')->get();
        }
        else {
            return null;
        }
    }

    public function addFriend(Request $request)
    {
        try {
    	    $user = Auth::user();
            $newFriendID = (int)$request->input('newfriend');
            $removeRequest = (int)$request->input('removeRequest');
            $friendRequested = User::where('id', $newFriendID)->first();

            //if user already requested this friendship
            $userAlreadyRequested = Friendship::where('user_id', $user->id)->where('friend_id', $friendRequested->id)->first();
            //if the friend already requested for a friendship => friendship get confirmed
            $friendrequest = Friendship::where('user_id', $friendRequested->id)->where('friend_id', $user->id)->first();

            if ($userAlreadyRequested) {
                if($removeRequest){
                    $userAlreadyRequested->delete();
                }
                return 'friendsrequest revoked';
            }elseif ($friendrequest) {
                //CONFIRM FRIEND REQUEST
                $ids = array($newFriendID,$user->id);
                $deleteUserschats = UsersInChat::getDeletedFriendship($ids);
                $chatDoesNotExist = collect($deleteUserschats[0])->isEmpty();
                
                Friendship::confirm($friendrequest);
                if($chatDoesNotExist){
                    //CREATE 2 WAY FRIENDSHIP
                    $chatID = Friendship::create($user , $friendRequested, 1);
                }else{
                    // MAKE CHAT BACK ACTIVE
                    $friendship = Friendship::createFriendship($user , $friendRequested , 1);
                    $chat = $deleteUserschats[1]->first();
                    $chat->is_deleted = 0;
                    $chat->save();
                    $chatID = $chat->id;
                    foreach ($deleteUserschats[0] as $userinChat) {
                        $userinChat->is_deleted = 0;
                        $userinChat->save();
                    }
                }

                $data = array('chatid' => $chatID, 'name' => $user->name , 'userid' => $user->id);
                $returnData = array('chatid' => $chatID, 'name' => $friendRequested->name , 'userid' => $friendRequested->id);
                $returnData = json_encode($returnData);
                broadcast(new UserEvents($newFriendID , "acceptfriend" , $data))->toOthers();
                return $returnData;
            }else{
                //SEND FRIEND_REQUEST
                $request = Friendship::create($user , $friendRequested, 0);
                broadcast(new UserEvents($newFriendID , "friendrequest" , $request->getData()))->toOthers();
                return 'friendship is requested';
            }
        } catch (Exception $e) {
            return 'something went wrong with the friendrequest';
        }

    }

    public function decline(Request $request)
    {
        $user = Auth::user();
        $newFriendID = $request->input('newfriend');
        $friendRequested = User::where('id', $newFriendID)->first();
        $friendship = Friendship::where('user_id', $friendRequested->id)->where('friend_id', $user->id)->first();
        $friendship->delete();
        return 'request declined';
    }

    public function delete(Request $request)
    {
        $user = Auth::user();
        $newFriendID = $request->input('newfriend');
        $chatid = (int)$request->input('chatID');

        // retreive data
        $friendRequested = User::where('id', $newFriendID)->first();
        $chat = Chat::where('id', $chatid)->first();
        $usersinchat = UsersInChat::where('chat_id', $chatid)->get();
        $friendship = Friendship::whereIn('user_id', [$friendRequested->id, $user->id])
                                ->whereIn('friend_id', [$friendRequested->id, $user->id])
                                ->get();
        // delete data
        $chat->is_deleted = 1;
        $chat->save();
        $friendship[0]->delete();
        $friendship[1]->delete();
        foreach ($usersinchat as $chatuser) {
            $chatuser->is_deleted = 1;
            $chatuser->save();
            broadcast(new UserEvents($chatuser->user_id ,"deletefriend" ,$chatid))->toOthers();
        }

        return 'friend deleted';
    }

    public function getFriendRequests()
    {
        $user = Auth::user();
        $friendrequests = Friendship::where('friendships.friend_id',$user->id)
                        ->join('users','users.id','friendships.user_id')
                        ->select('friendships.*','users.name')
                        ->where('friendships.confirmed',0)->get();
        return compact('friendrequests');
    }

    public function sendOnline(Request $request)
    {
        $this->validate($request, [
            'authid'      =>   'integer',
            'friendids'   =>   'array'
        ]);
        $userid = (int)$request->input('authid');
        $friendids = $request->input('friendids');

        $noDuplicates = array();
        foreach ($friendids as $id) {
            if(!in_array($id, $noDuplicates)){
                broadcast(new UserEvents($id , "sendOnline" , $userid))->toOthers();
                array_push($noDuplicates, $id);
            }
        }
    }

 public function receiveOnline(Request $request)
    {
        $this->validate($request, [
            'authid'      =>   'integer',
            'userid'      =>   'integer'
        ]);
        $authid = (int)$request->input('authid');
        $userid = $request->input('userid');

        broadcast(new UserEvents($userid , "receiveOnline" , $authid))->toOthers();
    }    
}
