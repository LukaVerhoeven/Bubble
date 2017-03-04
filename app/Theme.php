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
	
	protected function create($chat,$name,$color) {
	    $generalTheme = New Theme;
		$generalTheme->name = $name;
		$generalTheme->color = $color;
		$generalTheme->Chat()->associate($chat);
		$generalTheme->save();
	}
}
