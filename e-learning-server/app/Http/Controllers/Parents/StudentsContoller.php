<?php

namespace App\Http\Controllers\Parents;

use App\Http\Controllers\Controller;
use App\Models\Enrollement;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentsContoller extends Controller
{
    function IsSubmited(){
        $auth_user=Auth::user();
        $assign=Submission::find($auth_user->id);
        if($assign->exists()){
            $data=$assign->get();
        }else {
        return response()->json([
            "status" => "success", 
            "message" => "Not asignment submited"
            ]);
        }
        return response()->json([
        "status" => "success", 
        "data" => $data
        ]);
    }

    function IsCompleted(){
        $auth_user_id = Auth::user()->id;
        $child = User::child($auth_user_id)->first();

        if ($child) {
            $child_id = $child->id;
            $child_course = Enrollement::Completed()->where("student_id", $child_id)->get();
        
        if ($child_course->isNotEmpty()) {
            $data = $child_course;
        } else {
            return response()->json([
                "status" => "success", 
                "message" => "Not enrolled in courses"
        ]       );
        }

         return response()->json([
            "status" => "success", 
            "data" => $data
        ]);
        } else {
            return response()->json([
            "status" => "error", 
            "message" => "Child user not found"
        ]);
        }
    }
}