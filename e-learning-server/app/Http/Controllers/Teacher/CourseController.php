<?php

namespace App\Http\Controllers\Teacher;

use App\Http\Controllers\Controller;
use App\Models\AssignmentQuiz;
use App\Models\Course;
use Illuminate\Http\Request;

class CourseController extends Controller
{
    public function getCourseContent($courseId)
    {
        $course = Course::findOrFail($courseId);

        $content = [
            'materials' => $course->materials()->where('is_announcement', false)->orderBy('created_at')->get(),
            'announcements' => $course->materials()->where('is_announcement', true)->orderBy('created_at')->get(),
            'assignments' => $course->assignmentsQuizzes()->where('is_quiz', false)->orderBy('created_at')->get(),
            'quizzes' => $course->assignmentsQuizzes()->where('is_quiz', true)->orderBy('created_at')->get(),
        ];

        return response()->json(['content' => $content], 200);
    }

    public function createAssignmentQuiz(Request $request, $courseId)
    {
        $request->validate([
            'is_quiz' => 'required|boolean',
            'title' => 'required|string',
            'description' => 'required|string',
            'grade' => 'required|integer',
            'deadline' => 'required|date',
            'file_url' => 'nullable|string',
        ]);

        $course = Course::findOrFail($courseId);

        $assignmentQuiz = new AssignmentQuiz([
            'is_quiz' => $request->input('is_quiz'),
            'title' => $request->input('title'),
            'description' => $request->input('description'),
            'grade' => $request->input('grade'),
            'deadline' => $request->input('deadline'),
            'file_url' => $request->input('file_url'),
        ]);

        $course->assignmentsQuizzes()->save($assignmentQuiz);

        return response()->json(['message' => 'Assignment or quiz created successfully', 'content' => $assignmentQuiz], 201);
    }
}
