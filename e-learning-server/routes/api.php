<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Teacher\TeacherController;


Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'student',  'middleware' => 'auth.student'], function () {
    });


    Route::group(['prefix' => 'parent'], function () {
    });

    Route::group(['prefix' => 'admin'], function () {
    });

    Route::get("profile", [AuthController::class, "profile"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});


Route::group(['prefix' => 'guest'], function () {
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('/login', [AuthController::class, 'login']);
});


Route::group(['prefix' => 'teacher'], function () {
    Route::get('{teacherId}/courses', [TeacherController::class, 'getCourses']);
});
