<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UpdateChat;
use App\Events\UserEvents;
use App\UsersInChat;
use App\Message;
use App\Keyword;
use App\Theme;
use Auth;
use Emoji;

class MessageController extends Controller
{

    public function getMessages($id){
        $messages = Message::where('messages.chat_id', $id)
        ->join('users', 'users.id', '=', 'messages.user_id')
        ->join('themes', 'themes.id', '=', 'messages.theme_id')
        ->orderBy('messages.id','desc')
        ->select('messages.*', 'users.id as user_id', 'users.name as name', 'users.profile_image', 'themes.color')->paginate(20)->items();
        return $messages;
    }

    public function index($id = null)
    {
        if ($id == null) {
            return 'no id has been passed';
        }
        else {
            $user = Auth::user();
            $profileImage = $user->profile_image;

            try {
                $messages = collect($this->getMessages($id));
                $themes = Theme::where('chat_id', $id)->where('is_deleted', 0)->with('keywords')->get();
                $themes = Theme::addKeywordString($themes);
                // theme usage
                foreach ($themes as $key => $theme) {
                    $themeMessages = $messages->where('theme_id',$theme['id']);
                    $amountThemeMessages = $themeMessages->count();
                    $amountMessages = $messages->count();
                    if($amountMessages){
                        $themeUsage = ($amountThemeMessages/$amountMessages)*100;
                        $themeUsage = round($themeUsage) . '%';
                    }else{
                        $themeUsage = '0%';
                    }
                    $themes[$key] = collect($theme)->put('themeUsage', $themeUsage);
                }
                return compact('messages', 'themes','profileImage');
            } catch (Exception $e) {
                return 'something went wrong retrieving the chat';
            }
        }
    }
    
   	public function store(Request $request)
    {
        try {
            $this->validate($request, [
                'theme'        =>   'integer',
                'chatid'       =>   'integer',
                'profileImage' =>   'string',
                'text'         =>   'string',
            ]);
            $user = Auth::user();
            $chatid = (int)$request->input('chatid');
            $text = $request->input('text');
            $themeid =  (int)$request->input('theme');
            $profileImage = $request->input('profileImage');
            $theme = Theme::where('id', $themeid)->where('chat_id', $chatid)->first();
            // replace smileys
            preg_match_all('/:(.*?):/', $text, $emojis);
            foreach ($emojis[0] as $key => $emojiText) {
                try {
                    $emojiText = substr($emojiText, 1, -1);
                    $emoji = Emoji::findByAlias($emojiText);
                    $text = preg_replace('/:'.$emojiText.':/', $emoji, $text);

                } catch (\Exception $e) {
                }
            }
            // forced messages and no-theme messages
            $color = $theme->color;
            $forceTheme = 0;
            //normal messages that contains theme-word
            if($theme->is_general === 1){
                // if no theme was selected => check theme
                $keywords = Theme::select('keywords.*', 'themes.color')
                            ->where('themes.chat_id', $chatid)
                            ->where('themes.is_active', 1)
                            ->where('themes.is_deleted', 0)
                            ->join('keywords','keywords.theme_id','themes.id')->get();
                foreach ($keywords as $key => $word) {
                    if($word->word){
                        if (strpos($text, $word->word) !== false) {
                            $color = $word->color;
                            $themeid = $word->theme_id;
                            break;
                        }
                    }
                }
            }else{
            // forced message
                $forceTheme = $themeid;
            }
            
            // save message
            $message = New Message;
            $message->text = $text;
            $message->User()->associate($user);
            $message->chat_id = $chatid;
            $message->force_theme = $forceTheme;
            // if (is_int($theme)) {
            $message->theme_id = $themeid;
            // }else{
            //     $message->Theme()->associate($theme);
            // }
            $message->save();
            $message = collect($message)->put("profile_image", $profileImage);
            if(isset($color)){
                $message = $message->put("color", $color);
            }
            $user = Auth::user();

            broadcast(new UpdateChat($message , $user, $chatid))->toOthers();
            return 'Message record succefuly created and send';
        } catch (Exception $e) {
            return 'wrong postcall made';
        }
    }

    public function getThemes($id)
    {
        return Theme::where('chat_id', $id)->get();
    }


    public function unread(Request $request)
    {
       try {
            $this->validate($request, [
                'NotActive'     =>   'array',
                'chatid'        =>   'integer',
            ]);
            $NotActiveUsers = $request->input('NotActive');
            $chatid = $request->input('chatid');
            foreach ($NotActiveUsers as $userid) {
                UsersInChat::where('chat_id',$chatid)->where('user_id', $userid)->increment("unread_messages");
                broadcast(new UserEvents($userid , "unreadmessage" , $chatid))->toOthers();
            }
       } catch (\Exception $e) {
            return "something went wrong";
       }
    }

    public function read(Request $request)
    {
       try {
            $this->validate($request, [
                'chatid'        =>   'integer',
                'userid'        =>   'integer',
            ]);
            $userid = $request->input('userid');
            $chatid = $request->input('chatid');
            $UserInchat = UsersInChat::where('chat_id',$chatid)->where('user_id', $userid)->update(["unread_messages" => 0]);
       } catch (\Exception $e) {
            return "something went wrong";
       }
    }
}
