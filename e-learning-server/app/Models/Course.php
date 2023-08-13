<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Course extends Model
{
    use HasFactory;

    public function teacher()
    {
        return $this->belongsTo(User::class, 'teacher_id');
    }

    public function users() {
        return $this->belongsToMany(User::class);
    }

    public function enrollments()
    {
        return $this->hasMany(Enrollment::class, 'course_id');
    }

    public function materials()
    {
        return $this->hasMany(Material::class, 'course_id');
    }

    public function assignmentsQuizzes()
    {
        return $this->hasMany(AssignmentQuiz::class, 'course_id');
    }
}
