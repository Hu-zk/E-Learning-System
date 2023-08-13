<?php

namespace App\Http\Controllers\Teacher;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\AssignmentQuiz;
use App\Models\Enrollment;
use App\Models\Submission;

class AssignmentController extends Controller
{
    public function getAssignmentDetails($assignmentId)
    {
        $assignment = AssignmentQuiz::findOrFail($assignmentId);
        $submissions = Submission::where('assignment_id', $assignmentId)->with('student')->get();

        $submittedStudents = $submissions->pluck('student');

        $courseId = $assignment->course_id;
        $enrolledStudentIds = Enrollment::where('course_id', $courseId)->pluck('student_id');

        $totalStudents = $enrolledStudentIds->count();
        $submittedStudentsCount = $submittedStudents->count();
        $notSubmittedStudentsCount = $totalStudents - $submittedStudentsCount;

        $assignment->submitted_students = $submittedStudents;
        $assignment->count_student = [
            'students_count' => $totalStudents,
            'submitted_students_count' => $submittedStudentsCount,
            'not_submitted_students_count' => $notSubmittedStudentsCount,
        ];

        return response()->json([
            'assignment' => $assignment,
        ], 200);
    }
}
