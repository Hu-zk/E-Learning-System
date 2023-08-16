<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class UserType extends Model
{
    use HasFactory;

    protected $casts = [
    'rules' => 'json',
];


    public function users()
    {
        return $this->hasMany(User::class, 'user_type_id');
    }


    public function setRulesAttribute($value)
    {
        $this->attributes['rules'] = $value;
    }
}
