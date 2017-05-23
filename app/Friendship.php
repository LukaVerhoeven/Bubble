<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Auth;
use App\Chat;
use App\UsersInChat;
use App\Theme;
// use UserInChat;

class Friendship extends Model
{
    protected $fillable = ['user_id', 'friend_id', 'çonfirmed'];

	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}
    
	public function friend()
	{
		return $this->belongsTo('App\User','friend_id');
	}

    protected function getList() {
        $friends = DB::table('users')
                    ->select('users.id', 'users.name', 'users.email')
                    ->join('friendships', 'friendships.friend_id', '=', 'users.id')
                    ->where('friendships.user_id', Auth::user()->id)
                    ->orderBy('users.name', 'desc')
                    ->get();

        return $friends;
    }

    protected function getListFriendrequest() {
        $friends = DB::table('users')
                    ->select('users.id', 'users.name', 'users.email')
                    ->join('friendships', 'friendships.user_id', '=', 'users.id')
                    ->where('friendships.friend_id', Auth::user()->id)
                    ->orderBy('users.name', 'desc')
                    ->get();

        return $friends;
    }

    protected function create($user , $friendRequested , $isConfirmed) {
        $friendship = Friendship::createFriendship($user , $friendRequested , $isConfirmed);

        if ($isConfirmed) {
        	$chat = New Chat;
        	$chat->chat_name = 'friendchat';
            $chat->function = 'friendchat';
            $chat->is_deleted = 0;
        	$chat->save();

            Theme::create($chat,'general','white',0 ,0, 1);
            UsersInChat::create($user,$chat);
            UsersInChat::create($friendRequested,$chat);
            return $chat->id;
        }else{
            // return a friendrequest that can be broadcasted
            return response()->json([
                'confirmed' => $friendship->confirmed,
                'name' => $user->name,
                'is_blocked' => $friendship->is_blocked ,
                'user_id' => $user->id
            ]);
        }
    }

    protected function createFriendship($user , $friendRequested , $isConfirmed) {
        $friendship = New Friendship;
        $friendship->User()->associate($user);
        $friendship->Friend()->associate($friendRequested);
        $friendship->is_blocked = 0;
        $friendship->confirmed = $isConfirmed;
        $friendship->save();
        return $friendship;
    }

    protected function confirm($friendrequest) {
        $friendrequest->confirmed = 1;
        $friendrequest->save();
    }
}