<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class Chat extends Model
{
	public function users() {
	    return $this->hasMany('App\UsersInChat', 'chat_id');
  	}

	public function usersinchat() {
		$user = Auth::user();	
	    return $this->hasMany('App\UsersInChat', 'chat_id')->where('user_id', '!=', $user->id);
  	}
}