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
            $profileImage = $user->profile_image;

            try {
                $messages = Message::where('messages.chat_id', $id)
                ->join('users', 'users.id', '=', 'messages.user_id')
                ->orderBy('messages.id','asc')
                ->select('messages.*', 'users.id as user_id', 'users.name as name', 'users.profile_image')->get();
                $themes = Theme::where('chat_id', $id)->get();
                return compact('messages', 'themes','profileImage');
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
                'chat_id'      =>   'integer',
                'profileImage' =>   'string'
            ]);
            
            $user = Auth::user();
            $theme = Theme::where('id', $request->input('theme'))->where('chat_id', $id)->first();
            $message = New Message;
            $message->text = $request->input('text');
            $profileImage = $request->input('profileImage');
            $message->Theme()->associate($theme);
            $message->User()->associate($user);
            $message->chat_id = $id;
            $message->save();
            $message = collect($message)->put("profile_image", $profileImage);
            $user = Auth::user();
            broadcast(new UpdateChat($message , $user, $id))->toOthers();

            return 'Message record succefuly created and send';
        } catch (Exception $e) {
            return 'wrong postcall made';
        }
    }

    public function getThemes($id)
    {
        return Theme::where('chat_id', $id)->get();
    }
}
