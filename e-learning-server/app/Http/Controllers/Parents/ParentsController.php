<?php

namespace App\Http\Controllers\Parents;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParentsController extends Controller
{
function getParent() {
    $auth_user = Auth::user();
    $parent = User::find($auth_user->id);

    if ($parent->UserSendMeet()->exists()) {
        $parent_meet = $parent->UserSendMeet()->with("receiverMeet")->with("sendMeet")->get();
    } else {
        return response()->json([
        "status" => "success", 
        "message" => "No meeting"
    ]);
    }

    return response()->json([
        "status" => "success", 
        "data" => $parent_meet
    ]);
}

Function getChild(){
    $auth_user_id = Auth::user()->id;
    $child=User::Child($auth_user_id)->get();

     return response()->json([
        "status" => "success", 
        "data" => $child
    ]);
}

}
