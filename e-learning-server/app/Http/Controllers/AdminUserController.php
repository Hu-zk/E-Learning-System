<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Hash;

class AdminUserController extends Controller
{

    function create() {
        return "ues";
    }

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

    function teacherReports($teacherId) {

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

    // function updateAppearance(Request $request) {

    //     $user_type = UserType::find(1);

    //     $rules = json_decode($user_type->rules, true);

    //     if($request->mode) {
    //         $rules["mode"] = $request->mode;
    //     }

    //     $user_type->rules = $rules;
    //     $user_type->save();

    //     return response()->json(['status' => 'success', 'message' => 'appearance updated successfully']);
    // }
}
