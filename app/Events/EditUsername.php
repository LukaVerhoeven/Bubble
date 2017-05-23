<?php

namespace App\Events;

use Illuminate\Broadcasting\Channel;
use Illuminate\Queue\SerializesModels;
use Illuminate\Broadcasting\PrivateChannel;
use Illuminate\Broadcasting\PresenceChannel;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Broadcasting\InteractsWithSockets;
use Illuminate\Contracts\Broadcasting\ShouldBroadcast;

class EditUsername implements ShouldBroadcast
{
    use Dispatchable, InteractsWithSockets, SerializesModels;

    public $newUsername;
    public $userid;
    public $roomid;

    public function __construct($newUsername, $userid, $RoomId)
    {
        $this->newUsername = $newUsername;
        $this->userid = $userid;
        $this->roomid = $RoomId;
    }

    /**
     * Get the channels the event should broadcast on.
     *
     * @return Channel|array
     */
    public function broadcastOn()
    {
        return new PresenceChannel('chatroom.' . $this->roomid);
    }
}
