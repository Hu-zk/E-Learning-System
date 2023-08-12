<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
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
            'parent_id' => 0,
            'name' => 'Hussien',
            'email' => 'hsn@gmail.com',
            'password' => Hash::make('123456')
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
