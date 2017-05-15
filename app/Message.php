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
	        $messages = Message::where(function($query) use($keywords){
	            foreach($keywords as $keyword) {
	                $query->orWhere('text', 'LIKE', "%".$keyword."%");
	            }
	        })->where('force_theme',0)->where('chat_id', $chatid)->pluck('id');

			Message::whereNotIn('id',$messages)->where('theme_id',$themeid)->update(['theme_id' => $generalid]);	
        }

        Message::where(function($query) use($keywords){
            foreach($keywords as $keyword) {
                $query->orWhere('text', 'LIKE', "%".$keyword."%");
            }
        })->where('force_theme',0)->where('chat_id', $chatid)->update(['theme_id' => $themeid]);
	}
}
