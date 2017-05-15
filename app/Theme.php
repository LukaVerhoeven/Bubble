<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use App\Chat;

class Theme extends Model
{
	public function chat()
	{
		return $this->belongsTo('App\Chat','chat_id');
	}

	public function keywords() {
	    return $this->hasMany('App\Keyword', 'theme_id');
  	}
	
	protected function create($chat,$name,$color,$icon, $shortcut, $is_general) {
	    $generalTheme = New Theme;
		$generalTheme->name = $name;
		$generalTheme->icon = $icon;
		$generalTheme->color = $color;
		$generalTheme->shortcut = $shortcut;
		$generalTheme->is_active = 1;
		$generalTheme->is_deleted = 0;
		$generalTheme->is_general = $is_general;
		if(is_int($chat)){
			$generalTheme->chat_id = $chat;
		}else{
			$generalTheme->Chat()->associate($chat);
		}
		$generalTheme->save();
		return $generalTheme;
	}

	protected function addKeywordString($themes) {
        $themes = collect($themes)->map(function($item) {
            $keywords= collect(collect($item)['keywords'])->implode('word',', ');
            $item = collect($item)->put('keywordString', $keywords);
            return $item;
        });
		return $themes;
	}	
}
