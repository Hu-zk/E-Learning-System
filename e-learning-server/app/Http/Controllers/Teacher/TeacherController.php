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

    public function recordAttendance(Request $request, $courseId)
    {

        $attendanceArray = $request->input('students');

        foreach($attendanceArray as $attendanceData) {
            $attendance = new Attendance([
            'course_id' => $courseId,
            'student_id' => $attendanceData['studentId'],
            'status' => $attendanceData['status'],
            ]);
            $attendance->save();
        }

        return response()->json(['message' => 'Attendance processed successfully']);
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
