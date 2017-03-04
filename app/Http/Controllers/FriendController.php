<?php

namespace App\Http\Controllers;
// namespace App\Http\Controllers\Auth;

use Illuminate\Http\Request;
use Auth;
use App\User;
use App\Friendship;

class FriendController extends Controller
{
    public function searchNewFriend($id = null)
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
        if ($id == null) {
          return User::whereNotIn('id', $disabledIDs )->orderBy('id','asc')->take(20)->get();
        }
        else {
          return $this->show($id);
        }
    }

    public function getFriendList()
    {
        return Friendship::getList();
    }

    public function addFriend(Request $request)
    {
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
            Friendship::create($user , $friendRequested, 0);
            return 'friendship is requested';
        }

        return 'something went wrong with the friendrequest';
    }
    
}
