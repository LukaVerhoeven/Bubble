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
        if($request->input('friends')){
            foreach ($request->input('friends') as $key => $value) {
            	$friendInChat = new UsersInChat;
    	        $friendInChat->user_id = $value['userid'];
    	        $friendInChat->Chat()->associate($chat);
                $friendInChat->confirmed = 0;
    	        $friendInChat->save();
            }
        }
    }

    public function accept(Request $request)
    {   
        $this->validate($request, [
            'chatid'      =>   'integer',
        ]);

        $user = Auth::user();
        $UserInchat = UsersInChat::where('chat_id',$request->input('chatid'))->where('user_id', $user->id)->first();
        $UserInchat->confirmed = 1;
        $UserInchat->save();
    }

    public function decline(Request $request)
    {   
        $this->validate($request, [
            'chatid'      =>   'integer',
        ]);

        $user = Auth::user();
        $UserInchat = UsersInChat::where('chat_id',$request->input('chatid'))->where('user_id', $user->id)->first();
        $UserInchat->delete();
    }
}
