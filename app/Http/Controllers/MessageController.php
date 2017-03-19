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

            try {
                $messages = Message::where('chat_id', $id)->orderBy('id','asc')->get();
                $themes = Theme::where('chat_id', $id)->get();
                // dd($messages, $id);
                return compact('messages', 'themes');
            } catch (Exception $e) {
                return 'something went wrong retrieving the chat';
            }
        }
    }
    
   	public function store(Request $request, $id)
    {
        try {
            $theme = Theme::where('id', $request->input('theme'))->where('chat_id', $id)->first();
            $message = New Message;
            $message->text = $request->input('text');
            $message->Theme()->associate($theme);
            $message->chat_id = $id;
            $message->save();
            $user = Auth::user();
            // $test = new UpdateChat($message , $user, $id);
            // dd($test);
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
