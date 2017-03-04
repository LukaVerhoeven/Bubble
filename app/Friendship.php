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
                    ->select('users.*')
                    ->join('friendships', 'friendships.friend_id', '=', 'users.id')
                    ->where('friendships.user_id', Auth::user()->id)
                    ->orderBy('users.name', 'desc')
                    ->get();

        return $friends;
    }

    protected function create($user , $friendRequested , $isConfirmed) {
          	$friendship = New Friendship;
            $friendship->User()->associate($user);
            $friendship->Friend()->associate($friendRequested);
            $friendship->confirmed = $isConfirmed;
            $friendship->save();

            if ($isConfirmed) {
            	$chatUser1 = New UsersInChat;
            	$chatUser2 = New UsersInChat;
            	$chat = New Chat;
                

            	$chat->chat_name = 'friendchat';
                $chat->function = 'friendchat';
            	$chat->save();

                Theme::create($chat,'general','white');

            	$chatUser1->User()->associate($user);
            	$chatUser1->Chat()->associate($chat);
            	$chatUser1->save();

            	$chatUser2->User()->associate($friendRequested);
            	$chatUser2->Chat()->associate($chat);
            	$chatUser2->save();
            }
    }

    protected function confirm($friendrequest) {
            $friendrequest->confirmed = 1;
            $friendrequest->save();
    }


}
