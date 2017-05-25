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

	public function chat()
	{
		return $this->belongsTo('App\Chat','chat_id');
	}

	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	public static function updateTheme($keywords, $themeid, $chatid, $generalid)
	{
        if($generalid){
        	// get all messages that contains the (new) keywords
	        $messages = Message::where(function($query) use($keywords){
	            foreach($keywords as $keyword) {
	                $query->orWhere('text', 'LIKE', "%".$keyword."%");
	            }
	        })->where('force_theme',0)->where('chat_id', $chatid)->pluck('id');
	        // remove theme from messages that don't contain any keywords anymore
			Message::whereNotIn('id',$messages)->where('theme_id',$themeid)->update(['theme_id' => $generalid]);
			// toggle theme => reactivate forced messages
			Message::where('force_theme', $themeid)->update(['theme_id' => $themeid]);
        }

        Message::where(function($query) use($keywords){
            foreach($keywords as $keyword) {
                $query->orWhere('text', 'LIKE', "%".$keyword."%");
            }
        })->where('force_theme',0)->where('chat_id', $chatid)->update(['theme_id' => $themeid]);
	}
}
