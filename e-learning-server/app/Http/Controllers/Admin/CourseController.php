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

    
}
