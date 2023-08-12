<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request; 

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
}
