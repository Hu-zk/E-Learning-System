<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AssignmentQuiz extends Model
{
    use HasFactory;

    protected $fillable = [
        'is_quiz',
        'title',
        'description',
        'grade',
        'deadline',
        'file_url',
    ];

    protected $table = 'assignments_quizzes';

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function submissions()
    {
        return $this->hasMany(Submission::class, 'assignment_id');
    }
}
