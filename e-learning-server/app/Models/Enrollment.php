<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Enrollment extends Model
{
    use HasFactory;

    protected $table = 'enrollements';


    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function student()
    {
        return $this->belongsTo(User::class, 'student_id');
    }

    public function attendance()
    {
        return $this->hasOne(Attendance::class, 'enrollment_id');
    }

    public function submission()
    {
        return $this->hasOne(Submission::class, 'enrollment_id');
    }

    public function scopeCompleted($query){
        return $query->where("is_completed", 1);
    } 
}
