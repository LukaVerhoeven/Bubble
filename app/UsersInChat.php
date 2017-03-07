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
}
