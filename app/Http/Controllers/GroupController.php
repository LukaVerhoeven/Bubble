<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UsersInChat;
use App\Theme;
use App\Chat;
use Auth;

class GroupController extends Controller
{
    public function createGroup(Request $request)
    {	
		 $this->validate($request, [
            'chatname'		=>   'string',
        ]);
         
		$user = Auth::user();
        $chat = New Chat;
        $chat->chat_name = $request->input('chatname');
        $chat->function = 'groupschat';
        $chat->save();

        UsersInChat::create($user,$chat);
        Theme::create($chat,'general','white');

        foreach ($request->input('friends') as $key => $value) {
        	$friendInChat = new UsersInChat;
	        $friendInChat->user_id = $value['userid'];
	        $friendInChat->Chat()->associate($chat);
	        $friendInChat->save();
        }
		
    }
}
