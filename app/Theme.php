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
	
	protected function create($chat,$name,$color,$icon, $shortcut) {
	    $generalTheme = New Theme;
		$generalTheme->name = $name;
		$generalTheme->icon = $icon;
		$generalTheme->color = $color;
		$generalTheme->shortcut = $shortcut;
		$generalTheme->is_active = 1;
		$generalTheme->Chat()->associate($chat);
		$generalTheme->save();
	}
}
