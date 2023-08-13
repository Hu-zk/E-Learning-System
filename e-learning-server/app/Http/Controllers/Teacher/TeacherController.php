<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\User;
use Illuminate\Http\Request;

class TeacherController extends Controller
{
    public function getCourses($teacherId)
    {
        $teacher = User::findOrFail($teacherId);
        $courses = $teacher->courses;

        return response()->json(['courses' => $courses], 200);
    }

    public function recordAttendance(Request $request)
    {
        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|boolean',
        ]);

        //just to ensure that the course and student exists 
        $course = Course::findOrFail($request->course_id);
        $student = User::findOrFail($request->student_id);

        $attendance = new Attendance([
            'course_id' => $course->id,
            'student_id' => $student->id,
            'status' => $request->status,
        ]);
        $attendance->save();

        return response()->json(['message' => 'Attendance recorded successfully', 'attendance' => $attendance], 201);
    }
}
