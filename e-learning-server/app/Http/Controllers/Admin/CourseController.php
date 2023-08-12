<?php

namespace App\Http\Controllers;

use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    function createCourse(Request $request) {

        $validatedData = $request->validate([
            "teacher_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "capacity" => 'required|integer'
        ]);

        $course = Course::create($validatedData);

        return response()->json(["message" => "course created successfully", "course" => $course]);
    }

    function updateCourse(Request $request, $courseId) {

        $course = Course::find($courseId);

        $validatedData = $request->validate([
            "teacher_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "capacity" => 'required|integer'
        ]);

        $course->update($validatedData);

        return response()->json(["message" => "course updated successfully", "course" => $course]);
    }

    function courseReport($courseReport) {

        $course = Course::find($courseReport);

        $totalEnrollments = $course->enrollments->count();
        $completedEnrollments = $course->enrollments->where("is_completed", true)->count();

        return response()->json([
            "course" => $course,
            "total_enrollments" => $totalEnrollments,
            "completed_enrollments" => $completedEnrollments,
        ]);
    }
}
