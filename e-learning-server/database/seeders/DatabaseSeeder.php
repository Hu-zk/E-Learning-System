<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('user_types')->insert([
            'name' => "admin",
            '_rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "teacher",
            '_rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "parent",
            '_rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "student",
            '_rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 1,
            'parent_id' => null,
            'name' => 'Hussien',
            'email' => 'hsn@gmail.com',
            'password' => Hash::make('123456')
        ]);
        DB::table('users')->insert([
            'user_type_id' => 2,
            'parent_id' => null,
            'name' => 'Teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('123456')
        ]);
        DB::table('users')->insert([
            'user_type_id' => 3,
            'parent_id' => null,
            'name' => 'Parent',
            'email' => 'parent@gmail.com',
            'password' => Hash::make('123456')
        ]);
        DB::table('users')->insert([
            'user_type_id' => 4,
            'parent_id' => 3,
            'name' => 'student',
            'email' => 'student@gmail.com',
            'password' => Hash::make('123456')
        ]);

        DB::table('users')->insert([
            'teacher_id' => 2,
            'name' => 'Computer Science',
            'capacity' => 50,
        ]);

        DB::table('users')->insert([
            'user_type_id' => 3,
            'parent_id' => null,
            'name' => 'parent1',
            'email' => 'parent1@gmail.com',
            'password' => Hash::make('123456')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 4,
            'parent_id' => 2,
            'name' => 'mj',
            'email' => 'mj@gmail.com',
            'password' => Hash::make('123456')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 2,
            'parent_id' => null,
            'name' => 'teacher',
            'email' => 'teacher@gmail.com',
            'password' => Hash::make('123456')
        ]);

        DB::table('courses')->insert([
            'teacher_id' => 4,
            'name' => 'Intro to computer science',
            'capacity' => "20",
        ]);

        DB::table('enrollements')->insert([
            'course_id' => 1,
            'student_id' => 3,
            'is_completed' => false,
        ]);

        DB::table('materials')->insert([
            'course_id' => 1,
            'title' => 'Lecture 1',
            'description' => 'First Computer Science Lecture',
            'file_url' => "file",
            'is_announcement' => false,
        ]);

        DB::table('materials')->insert([
            'course_id' => 1,
            'title' => 'Announcement 1',
            'description' => 'First Computer Science Announcement',
            'file_url' => "file",
            'is_announcement' => true,
        ]);
        DB::table('assignments_quizzes')->insert([
            'course_id' => 1,
            'title' => 'Quiz 1',
            'grade' => 100,
            'deadline' => '2023-08-12',
            'description' => 'First Computer Science Quiz',
            'file_url' => "file",
            'is_quiz' => true,
        ]);
        DB::table('assignments_quizzes')->insert([
            'course_id' => 1,
            'title' => 'Assignment 1',
            'grade' => 100,
            'deadline' => '2023-08-12',
            'description' => 'First Computer Science Assignment',
            'file_url' => "file",
            'is_quiz' => false,
        ]);
    }
}
