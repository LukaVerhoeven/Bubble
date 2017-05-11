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

	public static function updateTheme($keywords, $themeid)
	{
        Message::where(function($query) use($keywords){
            foreach($keywords as $keyword) {
                $query->orWhere('text', 'LIKE', "%".$keyword."%");
            }
        })->where('force_theme',0)->update(['theme_id' => $themeid]);
        $messages = Message::where(function($query) use($keywords){
            foreach($keywords as $keyword) {
                $query->orWhere('text', 'LIKE', "%".$keyword."%");
            }
        })->where('force_theme',0)->get();

        dd($messages, $themeid, $keywords);
	}
}
