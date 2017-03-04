<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class UsersInChat extends Model
{
	protected $fillable = ['user_id', 'chat_id'];
	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}
	public function chat()
	{
		return $this->belongsTo('App\User','chat_id');
	}
}
