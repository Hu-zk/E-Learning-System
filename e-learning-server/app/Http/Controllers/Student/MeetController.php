<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Meeting;
use Auth;

class MeetController extends Controller
{
    //create Meet;
    function createMeet(Request $request){
        $meet = new Meeting;
        // $user =;
        $meet->sender_id =  Auth::id();
        $meet->receiver_id = $request->receiver_id;
        $meet->link_url = $request->link_url;
        $meet->save();

        return response()->json([
            'status' => 'success',
            'data' => $meet
        ]);
    }

    //get meets if any exist
    function checkMeet(){
        $user = Auth::user();
        $meet = Meeting::all()->where('receiver_id', $user->id);

        return response()->json([
            'status' => 'success',
            'data' => $meet
        ]);
    }
}
