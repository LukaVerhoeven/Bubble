<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UsersInChat;
use App\Chat;
use Auth;

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
        return view('chat');
    }

    public function getChatRooms()
    {
        $user = Auth::user();

        //returns All Chats and the users in it ( without the user that is logged in)
        $chats = Chat::with('friends')->get();
        // dd($chat);
        // $chats = UsersInChat::with('Chat')->where('user_id', $user->id )->with('friends' ,)->get();
        return $chats;
    }
}
