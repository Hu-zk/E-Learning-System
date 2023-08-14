<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use App\Models\Enrollment;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentContoller extends Controller
{
    function IsSubmitted()
    {
        $auth_user = Auth::user();

        if ($auth_user->user_type_id == 3) {
            $student = User::child($auth_user->id)->first();
        } else {
            $student = $auth_user;
        }

        $assignments = Submission::where("student_id", $student->id);

        if ($assignments->exists()) {
            $data = $assignments->get();
        } else {
            return response()->json([
                "status" => "success",
                "message" => "No assignments submitted"
            ]);
        }

        return response()->json([
            "status" => "success",
            "data" => $data
        ]);
    }


    function IsCompleted()
    {
        $auth_user = Auth::user();

        if ($auth_user->user_type_id == 3) {
            $student = User::child($auth_user->id)->first();
        } else {
            $student = $auth_user;
        }

        if ($student) {
            $student_id = $student->id;
            $student_courses = Enrollment::Completed()->where("student_id", $student_id)->get();

            if ($student_courses->isNotEmpty()) {
                return response()->json([
                    "status" => "success",
                    "data" => $student_courses
                ]);
            } else {
                return response()->json([
                    "status" => "success",
                    "message" => "Not enrolled in courses"
                ]);
            }
        } else {
            return response()->json([
                "status" => "error",
                "message" => "User not found"
            ]);
        }
    }
}
