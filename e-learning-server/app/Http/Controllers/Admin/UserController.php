<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\UserType;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;

class UserController extends Controller
{
    function createUser(Request $request) {

        $validatedDate = $request->validate([
            "user_type_id" => 'required|exists:user_types,id',
            "parent_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|string|min:8'
        ]);

        $user = User::create($validatedDate);

        return response()->json(['message' => 'User created successfully', 'user' => $user]);
    }

    function updateUser(Request $request, $userId) {

        $user = User::find($userId);

        $validatedDate = $request->validate([
            "user_type_id" => 'required|exists:user_types,id',
            "parent_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "email" => 'required|email|unique:users,email',
            "password" => 'required|string|min:8'
        ]);

        $user->update($validatedDate);

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
            "parents" => User::whre('user_type_id', 3)->get(),
            "teachers" => User::whre('user_type_id', 2)->get(),
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

    function updateAppearance(Request $request) {

        $user_type = UserType::find(1);

        if($request->mode) {
            $user_type->rules->mode = $request->mode;
        }

        if($request->email) {
            $user_type->rules->email = $request->email;
        }

        return response()->json(['status' => 'success', 'message' => 'appearance updated successfully']);
    }
}
