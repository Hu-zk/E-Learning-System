<?php

use App\Http\Controllers\AdminUserController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CourseController;
use App\Http\Controllers\Student\TestController;

Route::get('/test', [AdminUserController::class, 'create']);

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'student',  'middleware' => 'auth.student'], function () {
    });

    Route::group(['prefix' => 'parent'], function(){

    });

    Route::group(['prefix' => 'admin'], function(){
        // Route::post('/create-user', [UserController::class, 'createUser']);
        // Route::put('/update-user/{userId}', [UserController::class, 'updateUser']);
        // Route::delete('/delete-user/{userId}', [UserController::class, 'deleteUser']);
        // Route::get('/get-users', [UserController::class, 'getUsers']);
        // Route::post("/backup", [UserController::class, 'createBackup']);

        // Route::post('/create-course', [CourseController::class, 'createCourse']);
        // Route::put('/update-course/{courseId}', [CourseController::class, 'updateCourse']);
        // Route::get('/course-report/{courseId}', [CourseController::class, 'courseReport']);
        // Route::get('/teacher-report/{teacherId}', [CourseController::class, 'teacherReport']);
        // Route::get('/student-report/{studentId}', [CourseController::class, 'studentReport']);

        // Route::post("/update-appearance", [UserController::class, 'updateAppearance']);
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
    Route::post('record-attendance', [TeacherController::class, 'recordAttendance']);
});

Route::group(['prefix' => 'course'], function () {
    Route::get('{courseId}/content', [CourseController::class, 'getCourseContent']);
    Route::post('{courseId}/create-assignment-quiz', [CourseController::class, 'createAssignmentQuiz']);
    Route::post('{courseId}/create-material', [CourseController::class, 'createMaterial']);
    Route::get('{courseId}/students', [CourseController::class, 'getEnrolledStudents']);
});













Route::post('/create-user', [AdminUserController::class, 'createUser']);
        Route::put('/update-user/{userId}', [UserController::class, 'updateUser']);
        Route::delete('/delete-user/{userId}', [UserController::class, 'deleteUser']);
        Route::get('/get-users', [UserController::class, 'getUsers']);
        Route::post("/backup", [UserController::class, 'createBackup']);

        Route::post('/create-course', [CourseController::class, 'createCourse']);
        Route::put('/update-course/{courseId}', [CourseController::class, 'updateCourse']);
        Route::get('/course-report/{courseId}', [CourseController::class, 'courseReport']);
        Route::get('/teacher-report/{teacherId}', [CourseController::class, 'teacherReport']);
        Route::get('/student-report/{studentId}', [CourseController::class, 'studentReport']);

        Route::post("/update-appearance", [UserController::class, 'updateAppearance']);