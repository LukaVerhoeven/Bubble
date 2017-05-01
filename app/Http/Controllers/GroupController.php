<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UserEvents;
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

        $UsersInChat = array();
        $friends = $request->input('friends');

		$user = Auth::user();
        $chat = New Chat;
        $chat->chat_name = $request->input('chatname');
        $chat->function = 'groupschat';
        $chat->save();

        $AuthInchat = UsersInChat::create($user,$chat);
        array_push($UsersInChat, $AuthInchat);
        Theme::create($chat,'general','white');

        if($friends){
            foreach ($friends as $key => $value) {
            	$friendInChat = new UsersInChat;
    	        $friendInChat->user_id = $value['userid'];
    	        $friendInChat->Chat()->associate($chat);
                $friendInChat->admin = 0;
                $friendInChat->confirmed = 0;
    	        $friendInChat->save();
                array_push($UsersInChat, $friendInChat);
            }
        }

        $data = response()->json([
            'type' => 'grouprequest',
            'friends' => $UsersInChat,
            'chat_id' => $chat->id,
            'userIsAdmin' => 1 ,
            'chat_name' => $chat->chat_name,
            'function' => 'groupschat',
        ]);
        broadcast(new UserEvents($value['userid'] , "grouprequest" , $data->getData()))->toOthers();
    }

    public function accept(Request $request)
    {   
        $this->validate($request, [
            'chatid'      =>   'integer',
            'friends'      =>   'Array',
        ]);
        $friends = $request->input('friends');
        $chatid = $request->input('chatid');
        $user = Auth::user();
        $UserInchat = UsersInChat::where('chat_id',$chatid)->where('user_id', $user->id)->first();
        $UserInchat->confirmed = 1;
        $UserInchat->save();

        // Broadcast user confirmed
        $data = response()->json([
            'type'   => 'groupaccept',
            'userid' => $user->id,
            'chatid' => $chatid
        ]);
        foreach ($friends as $friend) {
            $id = $friend['user_id'];
            broadcast(new UserEvents($id , "groupaccept" , $data->getData()))->toOthers();
        }
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

    public function addFriendToGroup(Request $request)
    {   
        $this->validate($request, [
            'chatid'      =>   'integer',
            'newfriend'   =>   'integer'

        ]);
        try {
            $chatUser = New UsersInChat;
            $chatUser->user_id = $request->input('newfriend');
            $chatUser->chat_id = $request->input('chatid');
            $chatUser->admin = 0;
            $chatUser->confirmed = 0;
            $chatUser->save();
            return 'Add user requested';
        } catch (Exception $e) {
            return 'something went wrong';
        }
    }
}
