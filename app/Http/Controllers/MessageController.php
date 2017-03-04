<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\UsersInChat;
use App\Message;
use App\Theme;
use App\Chat;
use Auth;

class MessageController extends Controller
{

    public function index($id = null)
    {
        if ($id == null) {
            return 'no id has been passed';
        }
        else {
            $user = Auth::user();

            //GIVES ALL THE CHATS FROM THE USER WHICH IS LOGGED IN AND THE FRIEND WHICH IS CLICKED ON
            $UsersInChats = UsersInChat::where('user_id',$id)->orWhere('user_id', $user->id)->get();
            $chat;

            foreach ($UsersInChats as $key => $userInChat) {
                $areBothUserInTheChat = false;
                $chatID = $userInChat->chat_id;
                $IsLoggedInUserInChat = UsersInChat::where('user_id',$user->id)->where('chat_id', $chatID)->first();
                $IsFriendInChat = UsersInChat::where('user_id',$id)->where('chat_id', $chatID)->first();

                //IF THE LOGGED IN USER AND FRIEND ARE BOTH IN THIS CHAT
                if ($IsLoggedInUserInChat && $IsFriendInChat) {
                    //TODO: Minder db calls moeten doen voor het zelfde resultaat.
                    $IsFriendchat = Chat::where('id', $chatID)->where('function', 'friendchat')->first();
                    //IF THE CHAT IS A FRIENDCHAT AND NOT AN OTHER GROUPCHAT
                    if ($IsFriendchat) {
                        $chat = $IsFriendchat;
                        $chatID = $chat->id;
                        $messages = Message::where('chat_id', $chat->id)->orderBy('id','asc')->get();
                        return compact('messages','chatID');
                    }else{
                        return 'there does not exist a friendchat between this 2 users';
                    }

                }
            }
            //IF THERE IS NO FRIENDCHAT FOUND WITH BOTH THE FRIEND AND THE LOGGED IN USER IN IT.
            return 'something went wrong with retrieving the chat.';
            
        }
    }
    
   	public function store(Request $request, $id)
    {
        $theme = Theme::where('name', $request->input('theme'))->where('chat_id', $id)->first();
        
        $message = New Message;
        $message->text = $request->input('text');
        $message->Theme()->associate($theme);
        $message->chat_id = $id;
        // dd($message); 
        $message->save();
        return 'Message record succefuly created withs' .$message->id;
    }
}
