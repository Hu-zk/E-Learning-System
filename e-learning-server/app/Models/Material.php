<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Material extends Model
{
    use HasFactory;

    protected $fillable = [
        'title',
        'description',
        'file_url',
        'is_announcement',
    ];

    public function course()
    {
        return $this->belongsTo(Course::class, 'course_id');
    }
        public function scopeIsAnnouncement($query){
        return $query->where("is_announcement", 1);
    } 
}
