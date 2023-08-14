<?php

use App\Http\Controllers\AdminUserController;
use App\Http\Controllers\AdminCourseController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\Student\TestController;

Route::get('/test', [AdminUserController::class, 'create']);


Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'parent',  'middleware' => 'auth.parent'], function () {

        Route::get("get_parent", [ParentsController::class, "getParent"]);
        Route::get("get_child", [ParentsController::class, "getChild"]);
        Route::get("get_is_submited", [StudentsContoller::class, "IsSubmitted"]);
        Route::get("get_is_completed", [StudentsContoller::class, "IsCompleted"]);
        Route::get("attendance_course", [CoursesContoller::class, "courseAttandance"]);
        Route::get("teacher_announcement", [MaterialsContoller::class, "TeacherAnnouncementWithParents"]);
        Route::get("teachers_courses", [CoursesContoller::class, "getCoursesTeacher"]);
    });


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
});

Route::group(['prefix' => 'admin'], function () {
});

Route::get("profile", [AuthController::class, "profile"]);
Route::post("logout", [AuthController::class, "logout"]);
Route::post("refresh", [AuthController::class, "refresh"]);



Route::group(['prefix' => 'guest'], function () {
    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('/login', [AuthController::class, 'login']);
});


Route::group(['prefix' => 'teacher'], function () {
    Route::get('{teacherId}/courses', [TeacherController::class, 'getCourses']);
});

Route::group(['prefix' => 'course'], function () {
    Route::get('{courseId}/content', [CourseController::class, 'getCourseContent']);
});













Route::post('/create-user', [AdminUserController::class, 'createUser']);
        Route::post('/update-user/{userId}', [AdminUserController::class, 'updateUser']);
        Route::delete('/delete-user/{userId}', [AdminUserController::class, 'deleteUser']);
        Route::get('/get-users', [AdminUserController::class, 'getUsers']);
        Route::post("/backup", [AdminUserController::class, 'createBackup']);

        Route::post('/create-course', [AdminCourseController::class, 'createCourse']);
        Route::post('/update-course/{courseId}', [AdminCourseController::class, 'updateCourse']);
        Route::get('/course-report/{courseId}', [AdminCourseController::class, 'courseReport']);
        Route::get('/teacher-report/{teacherId}', [AdminCourseController::class, 'teacherReport']);
        Route::get('/student-report/{studentId}', [AdminCourseController::class, 'studentReport']);

        Route::post("/update-appearance", [AdminUserController::class, 'updateAppearance']);