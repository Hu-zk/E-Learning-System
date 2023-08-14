<?php

namespace App\Http\Controllers\Parent;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class ParentController extends Controller
{
    function getParent()
    {
        $auth_user = Auth::user();
        $parent = User::find($auth_user->id);

        if ($parent->UserSendMeet()->exists()) {
            $data = $parent->UserSendMeet()->with("receiverMeet")->with("sendMeet")->get();
        } else {
            return response()->json([
                "status" => "success",
                "message" => "No meeting"
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $data
        ]);
    }

    function getChild()
    {
        $auth_user_id = Auth::user()->id;
        $child_course = User::child($auth_user_id)->StudentEnroll()->with('course');

        if ($child_course->exists()) {
            $child = $child_course->get();
            // $data = [];

            // foreach ($child as $child) {
            //     $studentName = $child->name;
            //     $studentEmail = $child->email;
            //     $courseNames = $child->pluck('name')->toArray();

            //     $data[] = [
            //         'student_name' => $studentName,
            //         'student_email' => $studentEmail,
            //         'course_names' => $courseNames
            //     ];
            // }
        } else {
            return response()->json([
                "status" => "success",
                "message" => "Not enrolled in courses"
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $child
        ]);
    }
}
