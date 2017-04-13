<?php

namespace App\Http\Controllers;
// namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Friendship;
use App\Events\UserEvents;

class FriendController extends Controller
{
    public function searchNewFriend($letters = null)
    {   
        $user = Auth::user();
        $friends = Friendship::getList();
        $disabledIDs = array();

        //DON'T FIND YOURSELF AND FRIENDS
        array_push($disabledIDs, $user->id);
        foreach ($friends as $key => $friend) {
            array_push($disabledIDs, $friend->id);
        }
        
        //ONLY RETURN NON-FRIEND USERS
        if ($letters) {
            return User::whereNotIn('id', $disabledIDs )->where('name', 'LIKE', '%'.$letters.'%')->orderBy('id','asc')->take(20)->select('name', 'id')->get();
        }
        else {
            return null;
        }
    }

    // public function getFriendList()
    // {
    //     return Friendship::getList();
    // }

    public function addFriend(Request $request)
    {
        try {
    	    $user = Auth::user();
            $newFriendID = $request->input('newfriend');
            $friendRequested = User::where('id', $newFriendID)->first();

            //if user already requested this friendship
            $userAlreadyRequested = Friendship::where('user_id', $user->id)->where('friend_id', $friendRequested->id)->first();
            //if the friend already requested for a friendship => friendship get confirmed
            $friendrequest = Friendship::where('user_id', $friendRequested->id)->where('friend_id', $user->id)->first();

            if ($userAlreadyRequested) {
                return 'friendship is already requested';
            }elseif ($friendrequest) {
                //CONFIRM FRIEND REQUEST
                Friendship::confirm($friendrequest);

                //CREATE 2 WAY FRIENDSHIP
                Friendship::create($user , $friendRequested, 1);

                return array(true,'friendship is confirmed');
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

    public function getFriendRequests()
    {
        $user = Auth::user();
        $friendrequests = Friendship::where('friendships.friend_id',$user->id)
                        ->join('users','users.id','friendships.user_id')
                        ->select('friendships.*','users.name')
                        ->where('friendships.confirmed',0)->get();
        return compact('friendrequests');
    }
    
}
