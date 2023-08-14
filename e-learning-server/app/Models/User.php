<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;

class User extends Authenticatable implements JWTSubject
{
    use HasFactory, Notifiable;

    public function userType()
    {
        return $this->belongsTo(UserType::class, 'user_type_id');
    }

    public function courses()
    {
        return $this->hasMany(Course::class, 'teacher_id');
    }

    public function EnrolledCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollements', 'student_id', 'course_id');
    }

    public function CompletedCourses()
    {
        return $this->belongsToMany(Course::class, 'enrollements', 'student_id', 'course_id')->where('is_completed', '=', 1);
    }

    function UserSendMeet()
    {
        return $this->HasMany(Meeting::class, "sender_id");
    }
    function UserReceiveMeet()
    {
        return $this->HasMany(Meeting::class, "reciever_id");
    }
    function StudentEnroll()
    {
        return $this->HasMany(Enrollment::class, 'student_id');
    }

    function scopeChild($query, $id)
    {
        return $query->where("parent_id", $id);
    }


    protected $fillable = [
        'name',
        'email',
        'password',
    ];



    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
}
