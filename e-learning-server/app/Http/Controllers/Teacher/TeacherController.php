<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
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
}
