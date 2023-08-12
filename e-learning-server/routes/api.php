<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\TestController;
use App\Http\Controllers\UserController;

Route::group(['prefix'=> 'user', 'middleware' => 'auth:api'], function(){

    Route::group(['prefix' => 'student',  'middleware' => 'auth.student'], function(){
        Route::get('/test', [TestController::class, 'test']);
    });

    Route::group(['prefix' => 'teacher'], function(){

    });  

    Route::group(['prefix' => 'parent'], function(){

    });

    Route::group(['prefix' => 'admin', 'middlreware' => 'auth.admin'], function(){
        Route::post('/create-user', [UserController::class, 'createUser']);
        Route::post('/update-user/{userId}', [UserController::class, 'updateUser']);
        Route::delete('/delete-user/{userId}', [UserController::class, 'deleteUser']);
        Route::get('/get-users', [UserController::class, 'getUsers']);

        Route::post('/create-course', [UserController::class, 'createCourse']);
    });

    Route::get("profile", [AuthController::class, "profile"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});


Route::group(['prefix' => 'guest'], function(){
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('/login', [AuthController::class, 'login']);
});