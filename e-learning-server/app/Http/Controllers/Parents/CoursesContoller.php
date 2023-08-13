<?php

namespace App\Http\Controllers\Parents;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CoursesContoller extends Controller
{
    function courseAttandance(){
        $auth_user_id = Auth::user()->id;
        $student = User::child($auth_user_id)->first();
        $attendance=Attendance::AttendanceStatus()->where("student_id" , $student->id);
        if($attendance->exists()){
            $course_attend=$attendance->with('course')->get();
        }else {
            return response()->json([
                "status" => "success", 
                "message" => "Not atttendent courses"
            ]);
        }
            return response()->json([
                "status" => "success", 
                "data" => $course_attend
            ]);
    }
}
