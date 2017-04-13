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

        //returns All Chats and the users in it ( without the user that is logged in)

        // TODO This query doet 2 keer this=> in totaal 4 calls => delete dit allemaal
        // DB::enableQueryLog();
        // $chats = UsersInChat::with('friendchat')->where('user_id', $user->id )->get();
        // dd(DB::getQueryLog());

        $chatID = array();
        $groupchats = array();
        $chats = UsersInChat::where('users_in_chats.user_id', $user->id)->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')->orderBy('chats.chat_name', 'asc')->get();
        foreach ($chats as $chat) {
           array_push($chatID, $chat->id);
           if ($chat->function === "groupschat") {
               array_push($groupchats, $chat);
           }
        }

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
