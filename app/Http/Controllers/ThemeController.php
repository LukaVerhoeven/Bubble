<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Events\ThemeEvent;
use App\Keyword;
use App\Message;
use App\Theme;

class ThemeController extends Controller
{
    public function create(Request $request)
    {
        try {
            $this->validate($request, [
                'name'           =>   'string',
                'keywordString'  =>   'string',
                'color'          =>   'string',
                'icon'           =>   'string',
                'shortcut'       =>   'string',
                'chatid'         =>   'integer'
            ]);
            $name = $request->input('name');
            $keywords = $request->input('keywordString');
            $color = $request->input('color');
            $icon = $request->input('icon');
            $shortcut = $request->input('shortcut');
            $chatid = (int)$request->input('chatid');
            $keywords = Keyword::filterKeywords($keywords); //string to Array
            $theme = Theme::create($chatid, $name, $color, $icon, $shortcut, 0);
            $theme = collect($theme)->put("keywords", $keywords);
            broadcast(new ThemeEvent($theme , 'create', $chatid));
            Keyword::createKeywords($keywords, $theme['id'], $chatid);
            Message::updateTheme($keywords,$theme['id']);

        } catch (Exception $e) {
            return "something went wrong";
        }
    }

    public function update(Request $request)
    {
        try {
            $this->validate($request, [
                'name'           =>   'string',
                'keywordString'  =>   'string',
                'color'          =>   'string',
                'icon'           =>   'string',
                'shortcut'       =>   'string',
                'chat_id'        =>   'integer',
                'id'             =>   'integer'
            ]);
            $name = $request->input('name');
            $keywords = $request->input('keywordString');
            $color = $request->input('color');
            $icon = $request->input('icon');
            $shortcut = $request->input('shortcut');
            $chatid = (int)$request->input('chat_id');
            $themeid = (int)$request->input('id');
            $keywords = Keyword::filterKeywords($keywords); //string to Array

            $theme = Theme::where('id', $themeid)->first();
            $theme->name     = $name;
            $theme->color    = $color;
            $theme->icon     = $icon;
            $theme->shortcut = $shortcut;
            $theme->save();
            // broadcast here =>  ( new usage percentage )
            $theme = collect($theme)->put("keywords", $keywords);
            broadcast(new ThemeEvent($theme , 'update', $chatid))->toOthers();

            $oldKeywords = Keyword::where('theme_id', $themeid)->pluck('id');
            Keyword::whereIn('id', $oldKeywords)->delete();
            Keyword::createKeywords($keywords, $themeid, $chatid);
            // update all messages theme_id
            Message::updateTheme($keywords,$themeid);

        } catch (Exception $e) {
            return "something went bubbly wrong";
        }
    }

    public function toggle(Request $request)
    {
        try {
            $this->validate($request, [
                'id'        =>   'integer',
                'isActive'  =>   'integer',
                'generalID' =>   'integer',
                'chatid'    =>   'integer'
            ]);
            $themeid   = (int)$request->input('id');
            $isActive  = (int)$request->input('isActive');
            $chatid    = (int)$request->input('chatid');
            $generalid = (int)$request->input('generalID');
            $data = response()->json([
                'themeid' => $themeid,
                'isActive' => $isActive,
            ]);
            broadcast(new ThemeEvent($data->getData() , 'toggle', $chatid))->toOthers();
            Theme::where('id', $themeid)->update(['is_active' => $isActive]);
            if($isActive){
                $keywords = Keyword::where('theme_id', $themeid)->pluck('word');
                Message::updateTheme($keywords,$themeid);
            }else{
                Message::where('theme_id', $themeid)->update(['theme_id'=> $generalid]);
            }
        } catch (Exception $e) {
            return "something went bubbly wrong";
        }
    }

    public function delete(Request $request)
    {
        try {
            $this->validate($request, [
                'themeid'   =>   'integer',
                'generalID' =>   'integer',
                'chatid'    =>   'integer'
            ]);
            $themeid = (int)$request->input('themeid');
            $generalid = (int)$request->input('generalID');
            $chatid = (int)$request->input('chatid');

            broadcast(new ThemeEvent($themeid , 'delete', $chatid))->toOthers();
            Theme::where('id', $themeid)->update(['is_deleted' => 1]);
            Message::where('theme_id', $themeid)->update(['theme_id' => $generalid]);
        } catch (Exception $e) {
            return "something went bubbly wrong";
        }
    }    
}
