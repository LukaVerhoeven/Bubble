<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Theme;

class Message extends Model
{
    //
 	protected $table = 'messages';
    protected $fillable = array('text','theme_id','chat_id');

	public function theme()
	{
		return $this->belongsTo('App\Theme','theme_id');
	}
}
