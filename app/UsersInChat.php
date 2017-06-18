<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use Auth;
use DB;

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
        $chatUser->unread_messages = 0;
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
        // $test = Chat::with('users')
        // $deletedUsers = Chat::whereHas('users_in_chats', function ($query) {
        //         $query->where('id', '<', '10');
        //     })->orderByRaw("RAND()")->limit(5)
        //     ->get();

        // join('users_in_chats', 'users_in_chats.chat_id', '=', 'chats.id')
        //             ->where('chats.function', '=', 'friendchat')
        //             ->whereIn('users_in_chats.user_id', $userIDs)
        //             ->where('users_in_chats.is_deleted', 1)
        //             ->where('chats.is_deleted', 1)->get();

        $deletedChat = UsersInChat::select('users_in_chats.chat_id', DB::raw('count(*) as user_count, users_in_chats.chat_id '))
                ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                ->where('chats.function', '=', 'friendchat')
                ->whereIn('users_in_chats.user_id', $userIDs)
                ->where('users_in_chats.is_deleted', 1)
                ->where('chats.is_deleted', 1)
                ->groupBy('users_in_chats.chat_id')
                ->get();


        $return = null;
        if(!$deletedChat->isEmpty()){
            $deletedChat = collect($deletedChat->first());
            // dd($deletedChat);
            $deletedChat = $deletedChat->where('user_count', 2);
            $chat_id = $deletedChat->get('chat_id');

            $deletedUsers = UsersInChat::select('users_in_chats.id','users_in_chats.chat_id as chat_id','users_in_chats.is_deleted', 'users_in_chats.user_id')
                ->where('users_in_chats.chat_id', $chat_id)
                ->get();

            $deletedChat = Chat::where('id', $chat_id)->first();
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
