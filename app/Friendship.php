<?php

namespace App;

use Illuminate\Database\Eloquent\Model;
use DB;
use Auth;
use App\Chat;
use App\UsersInChat;
use App\Theme;
// use UserInChat;

class Friendship extends Model
{
    protected $fillable = ['user_id', 'friend_id', 'çonfirmed'];

	public function user()
	{
		return $this->belongsTo('App\User','user_id');
	}
    
	public function friend()
	{
		return $this->belongsTo('App\User','friend_id');
	}

    protected function getList() {
        $friends = DB::table('users')
                    ->select('users.id', 'users.name', 'users.email')
                    ->join('friendships', 'friendships.friend_id', '=', 'users.id')
                    ->where('friendships.user_id', Auth::user()->id)
                    ->orderBy('users.name', 'desc')
                    ->get();

        return $friends;
    }

    protected function create($user , $friendRequested , $isConfirmed) {
          	$friendship = New Friendship;
            $friendship->User()->associate($user);
            $friendship->Friend()->associate($friendRequested);
            $friendship->is_blocked = 0;
            $friendship->confirmed = $isConfirmed;
            $friendship->save();

            if ($isConfirmed) {
            	$chat = New Chat;
                
            	$chat->chat_name = 'friendchat';
                $chat->function = 'friendchat';
                $chat->is_deleted = 0;
            	$chat->save();

                Theme::create($chat,'general','white');
                UsersInChat::create($user,$chat);
                UsersInChat::create($friendRequested,$chat);
            }else{
                // return a friendrequest that can be broadcasted
                return response()->json([
                    'type' => 'friendrequest',
                    'confirmed' => $friendship->confirmed,
                    'name' => $user->name,
                    'is_blocked' => $friendship->is_blocked ,
                    'user_id' => $user->id
                ]);
            }
    }

    protected function confirm($friendrequest) {
            $friendrequest->confirmed = 1;
            $friendrequest->save();
    }
}