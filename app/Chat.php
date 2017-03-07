<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Chat extends Model
{
	public function usersinchat() {
	    return $this->hasMany('App\UsersInChat', 'chat_id');
  	}

  	public function friends() {
  		// TODO user meegeven
  		$user = Auth::user();
	    return $this->hasMany('App\UsersInChat', 'chat_id')->where('user_id' ,  '!=' , $user->id)->with('user');
  	}
}