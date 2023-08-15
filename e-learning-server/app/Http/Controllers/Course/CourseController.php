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

class CourseController extends Controller
{

    function createCourse(Request $request)
    {

        $validatedData = $request->validate([
            "teacher_id" => 'required|exists:users,id',
            "name" => 'required|string|max:255',
            "capacity" => 'required|integer'
        ]);

        $course = Course::create($validatedData);

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

    function courseReport($courseReport)
    {

        $course = Course::find($courseReport);

        $totalEnrollments = $course->enrollments->count();
        $completedEnrollments = $course->enrollments->where("is_completed", true)->count();

        return response()->json([
            "course" => $course,
            "total_enrollments" => $totalEnrollments,
            "completed_enrollments" => $completedEnrollments,
        ]);
    }

    function teacherReport($teacherId)
    {

        $teacher = User::find($teacherId);
        $teacher_courses = Course::where('teacher_id', $teacherId)->get();

        return response()->json($teacher_courses);
    }

    function studentReport($studentId)
    {

        $student = User::find($studentId);
        $enrolled_courses = $student->enrolledCourses;

        // return response()->json($enrolled_courses);

        $content = [];

        foreach ($enrolled_courses as $enrolledCourse) {
            $enrollments = $enrolledCourse->enrollments;

            foreach ($enrollments as $enrollment) {
                $avg_grade = $enrollment->submission->avg("grade");
                return response()->json($avg_grade);
            }


            $content[] = [
                "course" => $enrolledCourse,
                // "grade" => $avg_grade
            ];
        }

        return response()->json([
            'message' => 'success',
            'data' => $content
        ]);
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
            'is_quiz' => 'required|boolean',
            'title' => 'required|string',
            'description' => 'required|string',
            'grade' => 'required|integer',
            'deadline' => 'required|date',
            // 'file_url' => 'nullable|string',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileUrl = $file->store('uploads', 'public');
        } else {
            $fileUrl = null;
        }

        $course = Course::findOrFail($courseId);

        $assignmentQuiz = new AssignmentQuiz([
            'is_quiz' => $request->input('is_quiz'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'grade' => $request->input('grade'),
            'deadline' => $request->input('deadline'),
            'file_url' => $fileUrl,
        ]);

        $course->assignmentsQuizzes()->save($assignmentQuiz);

        return response()->json([
            'message' => 'Assignment or quiz created successfully',
            'content' => $assignmentQuiz
        ], 201);
    }


    public function createMaterial(Request $request, $courseId)
    {
        $request->validate([
            'title' => 'required|string',
            'description' => 'required|string',
            'is_announcement' => 'required|boolean',
            // 'file_url' => 'nullable|string',
        ]);

        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileUrl = $file->store('uploads', 'public');
        } else {
            $fileUrl = null;
        }

        $course = Course::findOrFail($courseId);

        $material = new Material([
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'file_url' => $fileUrl,
            'is_announcement' => $request->input('is_announcement'),
        ]);

        $course->materials()->save($material);

        return response()->json([
            'message' => 'Assignment or quiz created successfully',
            'content' => $material
        ], 201);
    }

    function courseAttandance()
    {
        $auth_user_id = Auth::user()->id;
        $student = User::child($auth_user_id)->first();
        $attendance = Attendance::AttendanceStatus()->where("student_id", $student->id);
        if ($attendance->exists()) {
            $course_attend = $attendance->with('course')->get();
        } else {
            return response()->json([
                "status" => "success",
                "message" => "Not atttendent courses"
            ]);
        }
        return response()->json([
            "status" => "success",
            "data" => $course_attend
        ]);
    }

    function getCoursesTeacher()
    {
        $auth_user_id = Auth::user()->id;
        $child_course = User::child($auth_user_id)->first();
        $all_data = $child_course->StudentEnroll()->with('course.teacher');
        if ($all_data->exists()) {
            $data = $all_data->get();
        }
        $courseTeachers = $data->pluck('course.teacher.name')->toArray();


        return response()->json([
            "status" => "success",
            "data" => $courseTeachers
        ]);
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
