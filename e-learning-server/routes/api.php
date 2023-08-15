<?php

use Illuminate\Http\Request;
use App\Http\Controllers\User\UserController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\User\AuthController;
use App\Http\Controllers\Parent\ParentController;
use App\Http\Controllers\Teacher\TeacherController;
use App\Http\Controllers\Student\StudentContoller;
use App\Http\Controllers\Course\CourseController;
use App\Http\Controllers\Course\MaterialContoller;
use App\Http\Controllers\Meet\MeetController;

Route::group(['prefix' => 'guest'], function () {

    Route::get("unauthorized", [AuthController::class, "unauthorized"])->name("unauthorized");
    Route::post('login', [AuthController::class, 'login']);
});

Route::group(['prefix' => 'user', 'middleware' => 'auth:api'], function () {

    Route::group(['prefix' => 'parent',  'middleware' => 'auth.parent'], function () {

        Route::get("get_parent", [ParentController::class, "getParent"]);
        Route::get("get_child", [ParentController::class, "getChild"]);
        Route::get("get_is_submited", [StudentContoller::class, "IsSubmitted"]);
        Route::get("get_is_completed", [StudentContoller::class, "IsCompleted"]);
        Route::get("attendance_course", [CourseController::class, "courseAttandance"]);
        Route::get("teachers_courses", [CourseController::class, "getCoursesTeacher"]);
        Route::get("teacher_announcement", [MaterialContoller::class, "TeacherAnnouncementWithParents"]);
    });


    Route::group(['prefix' => 'student',  'middleware' => 'auth.student'], function () {

        Route::post('upload-submission', [StudentContoller::class, 'uploadSubmission']);
        Route::get("enrolled_courses", [CourseController::class, "getCourses"]);
        Route::get("courses", [CourseController::class, "allCourses"]);
        Route::post("enroll", [CourseController::class, "enroll"]);
    });

    Route::group(['prefix' => 'admin'], function () {
        Route::post('/create-user', [UserController::class, 'createUser']);
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
    });

    Route::group(['prefix' => 'teacher',  'middleware' => 'auth.teacher'], function () {

        Route::get('{teacherId}/courses', [TeacherController::class, 'getCourses']);
        Route::post('record-attendance', [TeacherController::class, 'recordAttendance']);
        Route::post('update-submission', [TeacherController::class, 'updateSubmission']);
        Route::post('{courseId}/create-assignment-quiz', [CourseController::class, 'createAssignmentQuiz']);
        Route::post('{courseId}/create-material', [CourseController::class, 'createMaterial']);
        Route::get('{courseId}/students', [CourseController::class, 'getEnrolledStudents']);
        Route::get('{assignmentId}', [AssignmentController::class, 'getAssignmentDetails']);
    });

    Route::group(['prefix' => 'shared', 'middleware' => 'auth.user'], function () {

        Route::get("course_stats", [CourseController::class, "courseStats"]);
        Route::get("completed_courses", [CourseController::class, "completedCourses"]);
        Route::post("send_meet", [MeetController::class, "createMeet"]);
        Route::get("check_meet", [MeetController::class, "checkMeet"]);
        Route::post("remove_meet", [MeetController::class, "removeMeet"]);
        Route::get('{courseId}/content', [CourseController::class, 'getCourseContent']);
    });


    Route::get("profile", [AuthController::class, "profile"]);
    Route::post("logout", [AuthController::class, "logout"]);
    Route::post("refresh", [AuthController::class, "refresh"]);
});
