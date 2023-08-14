<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssignmentQuiz;
use App\Models\Attendance;
use App\Models\Course;
use App\Models\Submission;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class TeacherController extends Controller
{
    public function getCourses($teacherId)
    {
        $teacher = User::findOrFail($teacherId);
        $courses = $teacher->courses;

        return response()->json([
            'courses' => $courses
        ], 200);
    }

    public function recordAttendance(Request $request)
    {
        // $studentIds0 = $request->input('student_ids-0', []);
        // $studentIds1 = $request->input('student_ids-1', []);
        // $courseId = $request->input('course_id');


        // foreach ($studentIds0 as $studentId) {
        //     $attendance0[] = Attendance::create([
        //         'student_id' => $studentId,
        //         'course_id' => $courseId,
        //         'status' => 0,
        //     ]);
        // }

        // foreach ($studentIds1 as $studentId) {
        //     $attendance1[] = Attendance::create([
        //         'student_id' => $studentId,
        //         'course_id' => $courseId,
        //         'status' => 1,
        //     ]);
        // }
        // return response()->json([
        //     'message' => 'Attendance saved for selected students in course ' . $courseId . '.',
        //     'attendance0' => $attendance0,
        //     'attendance1' => $attendance1,
        // ]);


        $request->validate([
            'course_id' => 'required|exists:courses,id',
            'student_id' => 'required|exists:users,id',
            'status' => 'required|boolean',
        ]);

        //just to ensure that the course and student exists 
        $course = Course::findOrFail($request->course_id);
        $student = User::findOrFail($request->student_id);

        $attendance = new Attendance([
            'course_id' => $course->id,
            'student_id' => $student->id,
            'status' => $request->status,
        ]);
        $attendance->save();

        return response()->json([
            'message' => 'Attendance recorded successfully',
            'attendance' => $attendance
        ], 201);
    }

    public function updateSubmission(Request $request)
    {
        $submission = Submission::findOrFail($request->submission_id);
        $assignment = AssignmentQuiz::findOrFail($submission->assignment_id);
        $assignmentGrade = $assignment->value('grade');

        $validator = Validator::make($request->all(), [
            'submission_id' => 'required|exists:submissions,id',
            'grade' => "integer|min:0|nullable|lte:{$assignmentGrade}",
            'feedback' => 'string|nullable',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'message' => 'Validation error',
                'errors' => $validator->errors(),
            ], 422);
        }

        $submission->grade = $request->grade;
        $submission->feedback = $request->feedback;
        $submission->save();

        return response()->json([
            'message' => 'Submission updated successfully',
            'submission' => $submission,
        ], 200);
    }
}
