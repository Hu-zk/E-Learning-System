<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Attendance extends Model
{
    use HasFactory;

    protected $fillable = [
        'status',
        'course_id',
        'student_id',
    ];

    public function enrollment()
    {
        return $this->belongsTo(Enrollment::class, 'enrollment_id');
    }
     public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }

    public function scopeAttendanceStatus($query) {
        return $query->where('status',1);
    }
}
