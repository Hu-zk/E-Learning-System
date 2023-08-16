<?php

namespace App\Http\Controllers\Course;

use App\Http\Controllers\Controller;
use App\Models\AssignmentQuiz;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\Material;
use App\Models\Enrollment;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class CourseController extends Controller
{

    function createCourse(Request $request)
    {

        $validatedData = $request->validate([
            "teacher_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "capacity" => 'required|integer'
        ]);

        $teacher = User::find($request->teacher_id);

        if ($teacher->user_type_id == 2) {
            $course = Course::create($validatedData);
        }

        return response()->json(["message" => "course created successfully", "course" => $course]);
    }

    function updateCourse(Request $request, $courseId)
    {

        $course = Course::find($courseId);

        $course->name = $request->name;
        $course->capacity = $request->capacity;
        $course->teacher_id = $request->teacher_id;
        $course->save();

        // $validatedData = $request->validate([
        //     "teacher_id" => 'required|exists:users,id',
        //     "name" => 'required|string|max:255',
        //     "capacity" => 'required|integer'
        // ]);

        // $course->update($validatedData);

        return response()->json(["message" => "course updated successfully", "course" => $course]);
    }

    function courseReport($courseId)
    {

        $course = Course::find($courseId);

        $totalEnrollments = $course->enrollments->count();
        $completedEnrollments = $course->enrollments->where("is_completed", true)->count();

        return response()->json([
            // "course" => $course,
            "total_enrollments" => $totalEnrollments,
            "completed_enrollments" => $completedEnrollments,
        ]);
    }

    function teacherReport($teacherId)
    {

        $teacher_courses = Course::where('teacher_id', $teacherId)->get();
        $data = [];

        foreach ($teacher_courses as $course) {
            $course_assignments = $course->assignmentsQuizzes;

            $totalCourseGrade = 0;
            $totalAssignments = count($course_assignments);

            foreach ($course_assignments as $course_assignment) {
                $course_submissions = $course_assignment->submissions;

                foreach ($course_submissions as $submission) {
                    $totalCourseGrade += $submission->grade ?? 0;
                }
            }

            $averageCourseGrade = $totalAssignments > 0 ? $totalCourseGrade / $totalAssignments : 0;
            $data[] = [
                'course' => $course->name,
                'average_grade' => $averageCourseGrade,
            ];
        }

        return response()->json($data);
    }

    function studentReport($studentId)
    {

        $user = User::find($studentId);
        $enrolledCourses = $user->EnrolledCourses;

        $data = [];

        foreach ($enrolledCourses as $course) {
            $course_assignments = $course->assignmentsQuizzes;

            $totalCourseGrade = 0;
            $totalAssignments = count($course_assignments);

            foreach ($course_assignments as $course_assignment) {
                $student_submissions = $course_assignment->submissions->where('student_id', $studentId);

                foreach ($student_submissions as $submission) {
                    $totalCourseGrade += $submission->grade ?? 0;
                }
            }

            $averageCourseGrade = $totalAssignments > 0 ? $totalCourseGrade / $totalAssignments : 0;
            $data[] = [
                'course' => $course->name,
                'average_grade' => $averageCourseGrade,
            ];
        }

        return response()->json($data);
    }

    public function getCourseContent($courseId)
    {
        $course = Course::findOrFail($courseId);

        $content = [
            'materials' => $course->materials()->where('is_announcement', false)->orderBy('created_at')->get(),
            'announcements' => $course->materials()->where('is_announcement', true)->orderBy('created_at')->get(),
            'assignments' => $course->assignmentsQuizzes()->where('is_quiz', false)->orderBy('created_at')->get(),
            'quizzes' => $course->assignmentsQuizzes()->where('is_quiz', true)->orderBy('created_at')->get(),
        ];

        return response()->json([
            'content' => $content
        ], 200);
    }

    public function getEnrolledStudents($courseId)
    {
        $studentsEnrolled = Enrollment::where('course_id', $courseId)->with('student')->get();
        $students = $studentsEnrolled->pluck('student');

        return response()->json([
            'students' =>  $students
        ], 200);
    }

    public function createAssignmentQuiz(Request $request, $courseId)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'is_quiz' => 'required|boolean',
            // 'file' => 'required|mimes:pdf,doc,docx,jpg,png|max:20000',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileName = time() . '_' . $file->getClientOriginalName();
            $file->move(public_path('uploads/files'), $fileName);
        } else {
            $fileName = null;
        }

        $material = new Material([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file' => $fileName,
            'is_quiz' => $request->input('is_quiz'),
        ]);

        $course = Course::findOrFail($courseId);
        $course->materials()->save($material);

        return response()->json([
            'message' => 'File uploaded successfully',
            'content' => $material
        ], 201);

        return response()->json([
            'message' => 'File upload failed',
        ], 400);
    }


    public function createMaterial(Request $request, $courseId)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'is_announcement' => 'required|boolean',
            'video' => 'nullable|mimes:mp4|max:20000',
        ]);

        if ($request->hasFile('video')) {
            $video = $request->file('video');
            $videoName = time() . '_' . $video->getClientOriginalName();
            $video->move(public_path('uploads/Videos'), $videoName);
        } else {
            $videoName = null;
        }

        $material = new Material([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_url' => $videoName,
            'is_announcement' => $request->input('is_announcement'),
        ]);

        $course = Course::findOrFail($courseId);
        $course->materials()->save($material);

        return response()->json([
            'message' => 'Video uploaded successfully',
            'content' => $material
        ], 201);
    }

    function courseAttendance()
    {
        $auth_user_id = Auth::user()->id;
        $student = User::child($auth_user_id)->first();
        $attendance = Attendance::AttendanceStatus()->where("student_id", $student->id);

        if ($attendance->exists()) {
            $course_attend = $attendance->with('course')->get();

            $data = [];
            foreach ($course_attend as $attendance) {
                $data[] = [
                    "course_name" => $attendance->course->name,
                    "attendance_status" => $attendance->status
                ];
            }

            return response()->json([
                "status" => "success",
                "data" => $data
            ]);
        } else {
            return response()->json([
                "status" => "success",
                "message" => "Not attended courses"
            ]);
        }
    }

    function getCoursesTeacher()
    {
        $auth_user_id = Auth::user()->id;
        $child_course = User::child($auth_user_id)->first();
        $all_data = $child_course->StudentEnroll()->with('course.teacher');
        if ($all_data->exists()) {
            $data = $all_data->get();
            $data = $all_data->get();
            $courseTeachers = [];

            foreach ($data as $enrollment) {
                $teacherId = $enrollment->course->teacher->id;
                $teacherName = $enrollment->course->teacher->name;

                $courseTeachers[] = [
                    "teacher_id" => $teacherId,
                    "teacher_name" => $teacherName
                ];
            }
            $courseTeachers = $data->pluck('course.teacher.name')->toArray();

            foreach ($data as $enrollment) {
                $teacherId = $enrollment->course->teacher->id;
                $teacherName = $enrollment->course->teacher->name;

                $courseTeachers[] = [
                    "teacher_id" => $teacherId,
                    "teacher_name" => $teacherName
                ];
            }

            return response()->json([
                "status" => "success",
                "data" => $courseTeachers
            ]);
        } else {
            return response()->json([
                "status" => "success",
                "message" => "No courses found"
            ]);
        }
    }


    //enrolled courses by signed in student
    function getCourses()
    {
        $user = Auth::user();

        $courses = $user->EnrolledCourses()->get();
        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //enroll student in course
    function enroll(Request $request)
    {
        $enroll = new Enrollment();
        $enroll->student_id = Auth::id();
        $enroll->course_id = $request->course_id;
        $enroll->is_completed = false;
        $enroll->save();
        return response()->json([
            'status' => 'success',
            'data' => $enroll
        ]);
    }

    //get all courses(name, count and capacity)
    function allCourses()
    {
        $courses = Course::withCount('enrollments')->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses
        ]);
    }

    //get class name where student is enrolled + attendance in this class from table attendance +submissions count
    function courseStats()
    {
        $user = Auth::user();
        $user_id = $user->id;
        // $courses = $user->EnrolledCourses()->with('AttendanceByStudent')->where('student_id', $user->id)->get();
        $courses = $user->EnrolledCourses()->with(['AttendanceByStudent' => function ($query) use ($user_id) {
            $query->where('student_id',  $user_id);
        }])->with(['assignmentsQuizzes' => function ($query) use ($user_id) {
            $query->withCount(['submissions' => function ($query) use ($user_id) {
                $query->where('student_id',  $user_id);
            }]);
        }])->get();
        // $courses =$user->EnrolledCourses()->with(`AttendanceByStudent($user->id)`)->get();
        return response()->json([
            'status' => 'success',
            'user_id' => $user->id,
            'data' => $courses
        ]);
    }

    //get completed courses with final grade
    function completedCourses()
    {
        $user = Auth::user();
        $user_id = $user->id;
        // $courses = $user->CompletedCourses()->with('assignmentsQuizzes', 'assignmentsQuizzes.submissions')->get();
        $courses = $user->CompletedCourses()->with(['assignmentsQuizzes' => function ($query) use ($user_id) {
            $query->with(['submissions' => function ($query) use ($user_id) {
                $query->where('student_id',  $user_id);
            }]);
        }])->get();

        // foreach($courses as $course){
        // assignmentsQuizzes use the hasmany function to get all assignments of specific user
        // $course = $course->assignmentsQuizzes()->with('submissions')->get();

        //user belongsTo function when i want to return a specific item belonging to the user
        //assignmentQuiz
        // foreach($course as $course_assignment){
        //     $course_assignment = $course_assignment->assignmentQuiz()->get();
        // }
        // }
        // $courses = $user->CompletedCourses()->where('StudentAssignment')->get();
        // $courses = $user->CompletedCourses()->with('StudentAssignment')->get();

        return response()->json([
            'status' => 'success',
            'data' => $courses,
            // 'course_id' => $course,
            // 'course_assignment' => $course_assignment
        ]);
    }
}
