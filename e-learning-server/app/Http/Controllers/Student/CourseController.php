<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\Enrollement;
use Auth;

class CourseController extends Controller
{
    //enrolled courses by signed in student
    function getCourses (){
        $user = Auth::user();

        $courses = $user->EnrolledCourses()->get();
        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //enroll student in course -done
    function enroll(Request $request){
        $enroll = new Enrollement;
        $enroll->student_id = Auth::id();
        $enroll->course_id = $request->course_id;
        $enroll->is_completed = false;
        $enroll->save();
        return response()->json([
            'status' => 'success',
            'data' => $enroll
        ]);
        
    }

    //get all courses(name, count and capacity) -done
    function allCourses(){
        $courses = Course::withCount("enrollments")->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //get class name where student is enrolled + attendance in this class from table attendance +submissions count
    //user id auth, get class where enrolled,
    // get back to this one.
    function courseStats(){
        $user = Auth::user();
        $courses = $user->EnrolledCourses()->with('AttendanceByStudent')->where('student_id', $user->id)->get();
        // $courses =$user->EnrolledCourses()->with(`AttendanceByStudent($user->id)`)->get();
        return response()->json([
            'status' => 'success',
            'user_id' => $user->id,
            'data' => $courses
        ]);
    }

    //not complete yet
    function completedCourses(){
        $user = Auth::user();
        // $courses = $user->CompletedCourses()->get();
        $courses = $user->CompletedCourses()->where('StudentAssignment')->get();
        // $courses = $user->CompletedCourses()->with('StudentAssignment')->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

}
