<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;

class UsersInChat extends Model
{
	protected $fillable = ['user_id', 'chat_id'];

	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}

	public function chat()
	{
		return $this->belongsTo('App\Chat','chat_id');
	}

	public function friendchat() {
		// TODO: geef user mee
		// $user = Auth::user();
	    return $this->belongsTo('App\Chat','chat_id')->with('usersinchat');
  	}

  	public static function create($user, $chat){
  		$chatUser = New UsersInChat;
    	$chatUser->User()->associate($user);
    	$chatUser->Chat()->associate($chat);
      $chatUser->nickname = $user->name;
    	$chatUser->admin = 1;
    	$chatUser->confirmed = 1;
    	$chatUser->is_deleted = 0;
    	$chatUser->save();
    	return $chatUser;
  	}

  	public static function deleteUsersInChat($userid, $chatid){
        $UserInchat = UsersInChat::where('chat_id',$chatid)->where('user_id', $userid)->first();
        $UserInchat->delete();
  	}

    public static function AddNameJson($name, $friendInChat){
        $friendInChat = collect($friendInChat)->put('name', $name);
        $friendInChat = $friendInChat->forget('user');
        $friendInChat = $friendInChat->forget('chat');
        return $friendInChat;
    }

    public static function getDeletedFriendship($userIDs){
        $deletedUsers = UsersInChat::select('users_in_chats.id','users_in_chats.chat_id','users_in_chats.is_deleted', 'users_in_chats.user_id')
            ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
            ->where('chats.function', '=', 'friendchat')
            ->whereIn('users_in_chats.user_id', $userIDs)
            ->where('users_in_chats.is_deleted', 1)
            ->where('chats.is_deleted', 1)->get();
        $return = null;
        if(!$deletedUsers->isEmpty()){
            $deletedChat = Chat::where('id', $deletedUsers->first()->chat_id)->first();
            $userids = array();
            foreach ($deletedUsers as $user) {
                array_push($userids, $user->id);
            }
            $users = UsersInChat::whereIn('id', $userids)->get();
            $return = array($users, $deletedChat);
        }
        return $return;
    }
}
