<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ThemeController extends Controller
{
    public function create($id = null)
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
}
