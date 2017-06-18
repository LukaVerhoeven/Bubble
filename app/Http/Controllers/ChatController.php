<?php

namespace App\Http\Controllers;

use Illuminate\Support\Facades\Input;
use Illuminate\Support\Facades\Storage;
use Illuminate\Http\Request;
use App\Events\ProfileImage;
use App\Events\EditUsername;
use App\UsersInChat;
use App\Friendship;
use Auth;
use DB;
use Emoji;

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
        try {
            $emojis = Emoji::getEmojis();

            $shortcuts = array_merge(range('A', 'Z'), range('0', '9'));
            $disabled = array('W','N','T');
            $shortcuts = array_diff($shortcuts, $disabled);
            return view('layouts.chat-layout', compact('emojis', 'shortcuts'));
        } catch (\Exception $e) {
            return "something went wrong";
        }
    }

    public function editUserName(Request $request)
    {
        try {
            $this->validate($request, [
                'newUserName'    =>   'string',
                'chatid'         =>   'integer',
            ]);
            $chatid = (int)$request->input('chatid');
            $username = $request->input('newUserName');
            $user = Auth::user();
            $user->name = $username;
            $user->save();
            if($chatid){
                broadcast(new EditUsername($username , $user->id, $chatid))->toOthers();
            }
            return "name edited";
        } catch (Exception $e) {
            return "something went wrong";
        }
    }    

    public function editUserEmail(Request $request)
    {
        try {
            $this->validate($request, [
                'newUserEmail'    =>   'string',
            ]);
            $user = Auth::user();
            $user->email = $request->input('newUserEmail');
            $user->save();
            return "email edited";
        } catch (\Exception $e) {
            return "something went wrong";
        }
    }
    public function profileImage(Request $request)
    {   
        try {
            $this->validate($request, [
                'fileToUpload'    =>   'image',
            ]);

            $image = $request->file('fileToUpload');
            $chatid = (int)$request->input('chatid');
            if($image){
                $unique_name = md5($image->getClientOriginalName() . time()).'.'. $image->getClientOriginalExtension();
                $image->storeAs('public', $unique_name);
                $destinationPath = Storage::url($unique_name);
                $user = Auth::user();
                $user->profile_image = $destinationPath;
                $user->save();
                if($chatid){
                    broadcast(new ProfileImage($destinationPath , $user->id , $chatid))->toOthers();
                }
          
                return $destinationPath;
            }else{
                return "no image send";
            }
        } catch (\Exception $e) {
            return "something went wrong";
        }

    }

    public function getChatRooms()
    {
        try {
            $user = Auth::user();
            $userid = $user->id;
            $chatID = array();
            $groupchats = array();
            $groupchatsNoUsers = array();
            // Retreive ALL chats ( friendchats + groupchats)
            $chats = UsersInChat::where('users_in_chats.user_id', $user->id)
                    ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                    ->where('chats.is_deleted','!=', 1)->get(); // fields from users table

            // Retreive all chatID's for the friendschats and get all the groupschats out of it
            foreach ($chats as $chat) {
               array_push($chatID, $chat->id);
               if ($chat->function === "groupschat") {
                    array_push($groupchatsNoUsers, $chat);
               }else{

               }
            }
            
            // Get all users from the groupchats 
            $friendsInGroupChats = UsersInChat::select('name','user_id','confirmed', 'chat_id','users_in_chats.admin', 'users_in_chats.is_deleted' , 'users_in_chats.unread_messages')
                            ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                            ->join('users', 'users.id', '=', 'users_in_chats.user_id')
                            ->where('chats.function', '=', 'groupschat')
                            ->where('users_in_chats.is_deleted','!=', 1)
                            ->where('chats.is_deleted','!=', 1)
                            ->whereIn('chats.id',$chatID)->get();
                            
            // sort groupchats
            $groupchatsNoUsers= collect($groupchatsNoUsers)->sortBy('chat_name');
            // Push users into groupchat
            foreach ($groupchatsNoUsers as $chat) {
                $loggedinUser = $friendsInGroupChats->where('chat_id', $chat->chat_id)->where('user_id','=', $user->id)->first();
                if($loggedinUser){
                    $loggedinUser = $loggedinUser->toArray();
                    $friendGroup = $friendsInGroupChats->where('chat_id', $chat->chat_id)->toArray();
                    $chat = collect($chat)->put("friends", $friendGroup);
                    $chat = $chat->put("userIsAdmin", $loggedinUser['admin']);
                    $chat = $chat->put("unread_messages", $loggedinUser['unread_messages']);
                    array_push($groupchats, $chat);
                }
            }
            // Get all friends that belong to the friendchat
            $friends = DB::table('users')
                    ->select('users.id as userid', 'users.name', 'chats.id as chatid', 'users_in_chats.unread_messages', 'users_in_chats.nickname')
                    ->join('users_in_chats', 'users_in_chats.user_id', '=', 'users.id')
                    ->join('chats', 'chats.id', '=', 'users_in_chats.chat_id')
                    ->whereIn('chats.id',$chatID)
                    ->where('users.id','!=', $user->id)
                    ->where('chats.is_deleted','!=', 1)
                    ->where('users_in_chats.is_deleted','!=', 1)
                    ->where('function', '=', 'friendchat')
                    ->orderBy('users.name', 'asc')
                    ->get();

            $unread_messages = collect($chats)->where("user_id",  $user->id)->where("function",  'friendchat');
            foreach ($friends as $key => $friend) {
                $unread_message = $unread_messages->where('chat_id', $friend->chatid)->pluck('unread_messages');
                $friends[$key] = collect($friends[$key])->put('unread_messages',$unread_message[0]);
            }
            return compact('friends','groupchats','userid');
        } catch (\Exception $e) {
            return "something went wrong";
        }
    }
}