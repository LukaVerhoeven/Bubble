<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UsersInChat;
use App\Friendship;
use Auth;
use DB;

class ChatController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth');
    }

    /**
     * Show the application dashboard.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return view('layouts.chat-layout');
    }

    public function getChatRooms()
    {
        $user = Auth::user();
        $userid = $user->id;
        $chatID = array();
        $groupchats = array();
        $groupchatsNoUsers = array();

        // Retreive ALL chats ( friendchats + groupchats)
        $chats = UsersInChat::where('users_in_chats.user_id', $user->id)
                ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')->get(); // fields from users table

        // Retreive all chatID's and get all the groupschats out of it
        foreach ($chats as $chat) {
           array_push($chatID, $chat->id);
           if ($chat->function === "groupschat") {
               array_push($groupchatsNoUsers, $chat);
           }
        }
        
        // Get all users from the groupchats 
        $friendsInGroupChats = UsersInChat::select('name','user_id','confirmed', 'chat_id','users_in_chats.admin')
                        ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                        ->join('users', 'users.id', '=', 'users_in_chats.user_id')
                        ->where('chats.function', '=', 'groupschat')
                        ->whereIn('chats.id',$chatID)->get();

        // Push users into groupchat
        foreach ($groupchatsNoUsers as $chat) {
            $loggedinUser = $friendsInGroupChats->where('chat_id', $chat->chat_id)->where('user_id','=', $user->id)->first()->toArray();
            $friendGroup = $friendsInGroupChats->where('chat_id', $chat->chat_id)->toArray();
            $chat = collect($chat)->put("friends", $friendGroup);
            $chat = collect($chat)->put("userIsAdmin", $loggedinUser['admin']);
            array_push($groupchats, $chat);
        }

        // Get all friends that belong to the friendchat
        $friends = DB::table('users')
                ->select('users.id as userid', 'users.name', 'chats.id as chatid' )
                ->join('users_in_chats', 'users_in_chats.user_id', '=', 'users.id')
                ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                ->whereIn('chats.id',$chatID)
                ->where('users.id','!=', $user->id)
                ->where('function', '=', 'friendchat')
                ->orderBy('users.name', 'asc')
                ->get();

                
        return compact('friends','groupchats','userid');
    }


}
