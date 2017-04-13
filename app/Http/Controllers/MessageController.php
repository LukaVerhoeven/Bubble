<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UpdateChat;
use App\Message;
use App\Theme;
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
            $username = $user->name;

            try {
                $messages = Message::where('messages.chat_id', $id)
                ->join('users', 'users.id', '=', 'messages.user_id')
                ->orderBy('messages.id','asc')
                ->select('messages.id','messages.chat_id','messages.theme_id', 'messages.text', 'users.name')->get();
                $themes = Theme::where('chat_id', $id)->get();
                return compact('messages', 'themes','username');
            } catch (Exception $e) {
                return 'something went wrong retrieving the chat';
            }
        }
    }
    
   	public function store(Request $request, $id)
    {
        try {

            $this->validate($request, [
                'theme'      =>   'integer',
                'chat_id'      =>   'integer'
            ]);
            
            $user = Auth::user();
            $theme = Theme::where('id', $request->input('theme'))->where('chat_id', $id)->first();
            $message = New Message;
            $message->text = $request->input('text');
            $message->Theme()->associate($theme);
            $message->User()->associate($user);
            $message->chat_id = $id;
            $message->save();
            $user = Auth::user();
            broadcast(new UpdateChat($message , $user, $id))->toOthers();

            return 'Message record succefuly created with id: ' .$message->id;
        } catch (Exception $e) {
            return 'wrong postcall made';
        }
    }

    public function getThemes($id)
    {
        return Theme::where('chat_id', $id)->get();
    }
}
