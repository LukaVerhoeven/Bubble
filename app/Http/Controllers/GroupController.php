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
        try {
            
    		$this->validate($request, [
                'chatname'		=>   'string',
                'friends'      =>    'array',
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
            Theme::create($chat,'general','white', 0,0,1);


            if($friends){
                foreach ($friends as $key => $value) {
                    $friendInChat = new UsersInChat;
                    $friendInChat->user_id = $value['userid'];
                    $friendInChat->Chat()->associate($chat);
                    $friendInChat->nickname = $value['name'];
                    $friendInChat->admin = 0;
                    $friendInChat->confirmed = 0;
                    $friendInChat->is_deleted = 0;
                    $friendInChat->unread_messages = 0;
                    $friendInChat->save();
                    $friendInChat = UsersInChat::AddNameJson($value['name'], $friendInChat);
                    array_push($UsersInChat, $friendInChat);
                }
            }
            
            $data = response()->json([
                'friends' => $UsersInChat,
                'chat_id' => (int)$chat->id,
                'userIsAdmin' => 0 ,
                'chat_name' => $chat->chat_name,
                'function' => 'groupschat',
                'unread_messages' => 0,
            ]);

            $noDuplicates = array();
            foreach ($friends as $friend) {
                $id = $friend['userid'];
                if(!in_array($id, $noDuplicates)){
                    broadcast(new UserEvents($friend['userid'] , "grouprequest" , $data->getData()))->toOthers();
                    array_push($noDuplicates, $id);
                }
            }            
        } catch (\Exception $e) {
            return "group could not be created";
        }
    }

    public function accept(Request $request)
    {   
        try {
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
                'userid' => (int)$user->id,
                'chatid' => (int)$chatid,
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
        } catch (\Exception $e) {
            return "something went wrong";
        }
    }

    public function decline(Request $request)
    {   
        try {
            $this->validate($request, [
                'chatid'    =>   'integer',
                'userid'    =>   'integer',
                'friends'   =>   'Array'
            ]);
            $chatid = $request->input('chatid');
            $friends = $request->input('friends');
            $userid = (int)$request->input('userid');
            if($userid){
            // delete user from group
                UsersInChat::deleteUsersInChat($userid, $chatid);
            }else{
            // leave group or decline request
                $user = Auth::user();
                $userid = $user->id;
                UsersInChat::deleteUsersInChat($user->id, $chatid);
            }
            $data = response()->json([
                'userid'   => (int)$userid,
                'chatid'   => (int)$chatid
            ]);

            $noDuplicates = array();
            foreach ($friends as $friend) {
                $id = (int)$friend['user_id'];
                if(!in_array($id, $noDuplicates)){
                    broadcast(new UserEvents($id , "leavegroup" , $data->getData()))->toOthers();
                    array_push($noDuplicates, $id);
                }
            }
        } catch (\Exception $e) {
            return "something went wrong";
        }
    }

    public function addFriendToGroup(Request $request)
    {   
        try {
            $this->validate($request, [
                'chat_id'      =>   'integer',
                'user_id'   =>   'integer',
                'chatname'    =>   'string',
                'friends'     =>   'Array',
                'name'  =>   'string'

            ]);
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
                $UserInchat->nickname = $friendName;
                $UserInchat->admin = 0;
                $UserInchat->confirmed = 0;
                $UserInchat->is_deleted = 0;
                $UserInchat->unread_messages = 0;
                $UserInchat->save();
            }
            $UserInchat = collect($UserInchat)->put("name", $friendName);
            $friends = collect($friends)->push($UserInchat);
            $data = response()->json([
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
        } catch (\Exception $e) {
            return 'something went wrong';
        }
    }

    public function toggleAdmin(Request $request)
    {   
        try {
            $this->validate($request, [
                'userid'    =>   'integer',
                'admin'     =>   'integer',
                'chatid'    =>   'integer',
                'friends'   =>   'Array'
            ]);

            $userid = $request->input('userid');
            $chatid = $request->input('chatid');
            $isAdmin = $request->input('admin');
            $friends = $request->input('friends');
            $UserInchat = UsersInChat::where('chat_id', $chatid)->where('user_id', $userid)->first();
            $UserInchat->admin = $isAdmin;
            $UserInchat->save();

            $data = response()->json([
                'admin'    => (int)$isAdmin,
                'chatid'   => (int)$chatid,
                'userid'   => (int)$userid
            ]);

            $noDuplicates = array();
            foreach ($friends as $friend) {
                $userid = (int)$friend['user_id'];
                if(!in_array($userid, $noDuplicates)){
                    broadcast(new UserEvents($userid , "toggleAdmin" , $data->getData()))->toOthers();
                    array_push($noDuplicates, $userid);
                }
            }
        } catch (\Exception $e) {
            return "something went wrong";
        }

    }

    public function delete(Request $request)
    {   
        try {
            $this->validate($request, [
                'chatid'    =>   'integer',
                'friends'   =>   'Array'
            ]);

            $chatid = $request->input('chatid');
            $friends = $request->input('friends');
            UsersInChat::where('chat_id', $chatid)->update(['is_deleted' => 1]);
            Chat::where('id', $chatid)->update(['is_deleted' => 1]);

            $data = response()->json([
                'chatid'   => (int)$chatid
            ]);

            $noDuplicates = array();
            foreach ($friends as $friend) {
                $userid = (int)$friend['user_id'];
                if(!in_array($userid, $noDuplicates)){
                    broadcast(new UserEvents($userid , "chatdeleted" , $data->getData()))->toOthers();
                    array_push($noDuplicates, $userid);
                }
            }
        } catch (\Exception $e) {
            return "something went wrong";
        }

    }

    public function renameChat(Request $request)
    {   
        try {
            $this->validate($request, [
                'newname'    =>   'string',
                'chatid'    =>   'integer',
                'friends'   =>   'Array'
            ]);

            $newname = $request->input('newname');
            $chatid = $request->input('chatid');
            $friends = $request->input('friends');
            Chat::where('id', $chatid)->update(['chat_name' => $newname]);

            $data = response()->json([
                'newname'  => $newname,
                'chatid'   => (int)$chatid
            ]);

            $noDuplicates = array();
            foreach ($friends as $friend) {
                $userid = (int)$friend['user_id'];
                if(!in_array($userid, $noDuplicates)){
                    broadcast(new UserEvents($userid , "renamechat" , $data->getData()))->toOthers();
                    array_push($noDuplicates, $userid);
                }
            }
        } catch (\Exception $e) {
            return "something went wrong";
        }

    }
}
