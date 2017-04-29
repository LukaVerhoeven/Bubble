<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class UsersInChat extends Model
{
	protected $fillable = ['user_id', 'chat_id'];

	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	public function chat()
	{
		return $this->belongsTo('App\Chat','chat_id');
	}

	public function friendchat() {
		// TODO: geef user mee
		// $user = Auth::user();
	    return $this->belongsTo('App\Chat','chat_id')->with('usersinchat');
  	}

  	public static function create($user, $chat){
  		$chatUser = New UsersInChat;
    	$chatUser->User()->associate($user);
    	$chatUser->Chat()->associate($chat);
    	$chatUser->admin = 1;
    	$chatUser->confirmed = 1;
    	$chatUser->save();
  	}
}
