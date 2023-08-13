<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Teacher\CourseController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Student\CourseController as StudentCourseController;


Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'student',  'middleware' => 'auth.student'], function () {
        Route::get("enrolled_courses", [StudentCourseController::class, "getCourses"]);
        Route::get("courses", [StudentCourseController::class, "allCourses"]);
        Route::get("course_stats", [StudentCourseController::class, "courseStats"]);
        Route::get("completed_courses", [StudentCourseController::class, "completedCourses"]);
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

Route::group(['prefix' => 'course'], function () {
    Route::get('{courseId}/content', [CourseController::class, 'getCourseContent']);
    Route::post('{courseId}/create-assignment-quiz', [CourseController::class, 'createAssignmentQuiz']);
    Route::post('{courseId}/create-material', [CourseController::class, 'createMaterial']);
});
