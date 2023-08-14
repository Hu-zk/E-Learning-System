<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Submission extends Model
{
    use HasFactory;

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function assignmentQuiz()
    {
        return $this->belongsTo(AssignmentQuiz::class, 'assignment_id');
    }

}
