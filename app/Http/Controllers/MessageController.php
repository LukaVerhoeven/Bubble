<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\UpdateChat;
use App\Message;
use App\Keyword;
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
                ->join('themes', 'themes.id', '=', 'messages.theme_id')
                ->orderBy('messages.id','asc')
                ->select('messages.*', 'users.id as user_id', 'users.name as name', 'users.profile_image', 'themes.color')->get();
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
            $chatid = $request->input('chatid');
            $text = $request->input('text');
            $themeid =  $request->input('theme');
            $profileImage = $request->input('profileImage');
            $theme = Theme::where('id', $themeid)->where('chat_id', $chatid)->first();
            if($theme->is_general === 1){
                // if no theme was selected => check theme
                $keywords = Theme::select('keywords.*', 'themes.color')
                            ->where('themes.chat_id', $chatid)
                            ->where('themes.is_active', 1)
                            ->where('themes.is_deleted', 0)
                            ->join('keywords','keywords.theme_id','themes.id')->get();
                foreach ($keywords as $key => $word) {
                    if (strpos($text, $word->word) !== false) {
                        $color = $word->color;
                        $theme = $word->theme_id;
                        break;
                    }
                }
                $forceTheme = 0;
            }else{
                $forceTheme = 1;
                $color = $theme->color;
            }
            $message = New Message;
            $message->text = $text;
            $message->User()->associate($user);
            $message->chat_id = $chatid;
            $message->force_theme = $forceTheme;
            if (is_int($theme)) {
                $message->theme_id = $theme;
            }else{
                $message->Theme()->associate($theme);
            }
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
}
