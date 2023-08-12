<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Meeting extends Model
{
    use HasFactory;

    function sendMeet()
    {
        return $this->belongsTo(User::class, "sender_id", "id");
    }
    function receiverMeet()
    {
        return $this->belongsTo(User::class, "reciever_id", "id");
    }
}
