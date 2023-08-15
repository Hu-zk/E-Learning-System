<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class UserController extends Controller
{

    function createUser(Request $request) {

        $user = new User();
        $user->name = $request->name;
        $user->email = $request->email;
        $user->user_type_id = $request->user_type_id;
        $user->password = Hash::make($request->password);
        if($request->parent_id) {
            $user->parent_id = $request->parent_id;
        }
        $user->save();

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    function updateUser(Request $request, $userId) {

        $user = User::find($userId);
        $user->name = $request->name;
        $user->email = $request->email;
        $user->password = Hash::make($request->password);
        if($request->parent_id) {
            $user->parent_id = $request->parent_id;
        }
        $user->save();

        return response()->json(['message' => 'User updated successfully', 'user' => $user]);
    }

    function deleteUser($userId) {

        $user = User::find($userId);
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }

    function getUsers() {

        $content = [
            "students" => User::where('user_type_id', 4)->get(),
            "parents" => User::where('user_type_id', 3)->get(),
            "teachers" => User::where('user_type_id', 2)->get(),
        ];

        return response()->json(['data' => $content]);
    }

    function teacherReport($teacherId) {

        $teacher = User::find($teacherId);
        $teacher_courses = $teacher->courses()->get();

        $content = [];

        foreach($teacher_courses as $course) {
            $averageGrade = $course->assignmentsQuizzes->submissions()->avg("grade");

            $content[] = [
                "course" => $course, 
                "average_grade" => $averageGrade
            ];
        }

        return response()->json(['data' => $content]);
    }

    function createBackup() {

        Artisan::call('backup:run');

        return response()->json(['message' => 'Backup created successfully']);
    }

    function updateAppearance(Request $request) {

        $user_type = UserType::find(1);

        if($user_type->rules !== null) {
            $result = explode(',', $user_type->rules);
            if($request->mode) {
                $result[0] = $request->mode;
            }
            if($request->email) {
                $result[1] = $request->email;
            }
            return response()->json($result);
        }
    }
}
