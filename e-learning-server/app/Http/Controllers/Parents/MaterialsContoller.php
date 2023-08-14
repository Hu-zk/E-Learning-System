<?php

namespace App\Http\Controllers\Parents;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class MaterialsContoller extends Controller
{
    public function TeacherAnnouncementWithParents() {
        $auth_user_id = Auth::user()->id;
        $child_course = User::child($auth_user_id)->first();
        $announcements=$child_course->StudentEnroll()->with('course.teacher')->with('course.materials') -> where("is_completed", 1)
        ->get();

        $data = [];

        foreach ($announcements as $announcement) {
            $courseName = $announcement->course->name;
            $teacherName = $announcement->course->teacher->name;

        foreach ($announcement->course->materials as $material) {
            $materialContent = $material->description;
            $materialCreated = $material->created_at;
            $data[] = [
                'course_name' => $courseName,
                'teacher_name' => $teacherName,
                'material_content' => $materialContent,
                'material_created' => $materialCreated
            ];
        }
    }
        return response()->json([
                "status" => "success", 
                "data" => $data,
            ]);
        
    }
}
