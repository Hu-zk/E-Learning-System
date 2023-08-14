<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Course;
use App\Models\AssignmentQuiz;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Support\Facades\Auth;

class CourseController extends Controller
{
    //enrolled courses by signed in student
    function getCourses()
    {
        $user = Auth::user();

        $courses = $user->EnrolledCourses()->get();
        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //enroll student in course
    function enroll(Request $request)
    {
        $enroll = new Enrollment();
        $enroll->student_id = Auth::id();
        $enroll->course_id = $request->course_id;
        $enroll->is_completed = false;
        $enroll->save();
        return response()->json([
            'status' => 'success',
            'data' => $enroll
        ]);
    }

    //get all courses(name, count and capacity)
    function allCourses()
    {
        $courses = Course::withCount('enrollments')->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //get class name where student is enrolled + attendance in this class from table attendance +submissions count
    function courseStats()
    {
        $user = Auth::user();
        $user_id = $user->id;
        // $courses = $user->EnrolledCourses()->with('AttendanceByStudent')->where('student_id', $user->id)->get();
        $courses = $user->EnrolledCourses()->with(['AttendanceByStudent' => function ($query) use ($user_id) {
            $query->where('student_id',  $user_id);
        }])->with(['assignmentsQuizzes' => function ($query) use ($user_id) {
            $query->withCount(['submissions' => function ($query) use ($user_id) {
                $query->where('student_id',  $user_id);
            }]);
        }])->get();
        // $courses =$user->EnrolledCourses()->with(`AttendanceByStudent($user->id)`)->get();
        return response()->json([
            'status' => 'success',
            'user_id' => $user->id,
            'data' => $courses
        ]);
    }

    //get completed courses with final grade
    function completedCourses()
    {
        $user = Auth::user();
        $user_id = $user->id;
        // $courses = $user->CompletedCourses()->with('assignmentsQuizzes', 'assignmentsQuizzes.submissions')->get();
        $courses = $user->CompletedCourses()->with(['assignmentsQuizzes' => function ($query) use ($user_id) {
            $query->with(['submissions' => function ($query) use ($user_id) {
                $query->where('student_id',  $user_id);
            }]);
        }])->get();

        // foreach($courses as $course){
        // assignmentsQuizzes use the hasmany function to get all assignments of specific user
        // $course = $course->assignmentsQuizzes()->with('submissions')->get();

        //user belongsTo function when i want to return a specific item belonging to the user
        //assignmentQuiz
        // foreach($course as $course_assignment){
        //     $course_assignment = $course_assignment->assignmentQuiz()->get();
        // }
        // }
        // $courses = $user->CompletedCourses()->where('StudentAssignment')->get();
        // $courses = $user->CompletedCourses()->with('StudentAssignment')->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses,
            // 'course_id' => $course,
            // 'course_assignment' => $course_assignment
        ]);
    }
}
