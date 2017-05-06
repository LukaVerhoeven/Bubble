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
        $chat->is_deleted = 0;
        $chat->save();

        $AuthInchat = UsersInChat::create($user,$chat);
        $AuthInchat = UsersInChat::AddNameJson($user->name, $AuthInchat);
        array_push($UsersInChat, $AuthInchat);
        Theme::create($chat,'general','white');


        if($friends){
            foreach ($friends as $key => $value) {
                $friendInChat = new UsersInChat;
                $friendInChat->user_id = $value['userid'];
                $friendInChat->Chat()->associate($chat);
                $friendInChat->admin = 0;
                $friendInChat->confirmed = 0;
                $friendInChat->is_deleted = 0;
                $friendInChat->save();
                $friendInChat = UsersInChat::AddNameJson($value['name'], $friendInChat);
                array_push($UsersInChat, $friendInChat);
            }
        }

        $data = response()->json([
            'type' => 'grouprequest',
            'friends' => $UsersInChat,
            'chat_id' => $chat->id,
            'userIsAdmin' => 0 ,
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
        $UserInchat = collect($UserInchat)->put('name', $user->name);

        // Broadcast user confirmed
        $data = response()->json([
            'type'   => 'groupaccept',
            'userid' => $user->id,
            'chatid' => $chatid,
            'user'   => $UserInchat
        ]);

        $noDuplicates = array();
        foreach ($friends as $friend) {
            $id = $friend['user_id'];
            if(!in_array($id, $noDuplicates)){
                broadcast(new UserEvents($id , "groupaccept" , $data->getData()));
                array_push($noDuplicates, $id);
            }
        }
    }

    public function decline(Request $request)
    {   
        $this->validate($request, [
            'chatid'      =>   'integer',
            'friends'   =>   'Array'
        ]);
        $chatid = $request->input('chatid');
        $friends = $request->input('friends');
        $user = Auth::user();
        UsersInChat::deleteUsersInChat($user->id, $chatid);
        $data = response()->json([
            'type'     => 'leavegroup',
            'userid'   => $user->id,
            'chatid'   => (int)$chatid
        ]);

        $noDuplicates = array();
        foreach ($friends as $friend) {
            $userid = (int)$friend['user_id'];
            if(!in_array($userid, $noDuplicates)){
                broadcast(new UserEvents($userid , "leavegroup" , $data->getData()))->toOthers();
                array_push($noDuplicates, $userid);
            }
        }
    }

    public function addFriendToGroup(Request $request)
    {   
        $this->validate($request, [
            'chat_id'      =>   'integer',
            'user_id'   =>   'integer',
            'chatname'    =>   'string',
            'friends'     =>   'Array',
            'name'  =>   'string'

        ]);
        try {
            $chatid = $request->input('chat_id');
            $friendid = $request->input('user_id');
            $chatname = $request->input('chatname');
            $friends = $request->input('friends');
            $friendName = $request->input('name');

            $UserInchat = UsersInChat::where('chat_id', $chatid)->where('user_id', $friendid)->first();
            if($UserInchat){
                $UserInchat->is_deleted = 0;
                $UserInchat->confirmed = 0;
                $UserInchat->admin = 0;
                $UserInchat->save();
            }else{
                $UserInchat = New UsersInChat;
                $UserInchat->user_id = $friendid;
                $UserInchat->chat_id = $chatid;
                $UserInchat->admin = 0;
                $UserInchat->confirmed = 0;
                $UserInchat->is_deleted = 0;
                $UserInchat->save();
            }
            $UserInchat = collect($UserInchat)->put("name", $friendName);
            $friends = collect($friends)->push($UserInchat);
            $data = response()->json([
                'type' => 'grouprequest',
                'friends' => $friends,
                'chat_id' => (int)$chatid,
                'userIsAdmin' => 0 ,
                'chat_name' => $chatname,
                'function' => 'groupschat',
                'confirmed' => 0,
                'is_deleted' => 0,
            ]);
            broadcast(new UserEvents($friendid , "grouprequest" , $data->getData()))->toOthers();
            return 'Add user requested';
        } catch (Exception $e) {
            return 'something went wrong';
        }
    }
}
