<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\DB;

class DatabaseSeeder extends Seeder
{

    public function run(): void
    {
        DB::table('user_types')->insert([
            'name' => "admin",
            'rules' => "light",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "teacher",
            'rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "parent",
            'rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('user_types')->insert([
            'name' => "student",
            'rules' => "",
            'created_at' => date('Y-m-d'),
            'updated_at' => date('Y-m-d')
        ]);

        DB::table('users')->insert([
            'user_type_id' => 1,
            'parent_id' => null,
            'name' => 'Admin',
            'email' => 'a@a',
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
            'parent_id' => null,
            'name' => 'student',
            'email' => 'student@gmail.com',
            'password' => Hash::make('123456')
        ]);

        DB::table('courses')->insert([
            'teacher_id' => 2,
            'name' => 'Computer Science',
            'capacity' => 50,
        ]);

        DB::table('courses')->insert([
            'teacher_id' => 2,
            'name' => 'Intro to computer science',
            'capacity' => "20",
        ]);

        DB::table('enrollements')->insert([
            'course_id' => 1,
            'student_id' => 4,
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

        DB::table('materials')->insert([
            'course_id' => 2,
            'title' => 'Lecture 1',
            'description' => 'First Computer Science Lecture',
            'file_url' => "file",
            'is_announcement' => false,
        ]);

        DB::table('materials')->insert([
            'course_id' => 2,
            'title' => 'Announcement 1',
            'description' => 'First Computer Science Announcement',
            'file_url' => "file",
            'is_announcement' => true,
        ]);
        DB::table('assignments_quizzes')->insert([
            'course_id' => 2,
            'title' => 'Quiz 1',
            'grade' => 100,
            'deadline' => '2023-08-12',
            'description' => 'First Computer Science Quiz',
            'file_url' => "file",
            'is_quiz' => true,
        ]);
        DB::table('assignments_quizzes')->insert([
            'course_id' => 2,
            'title' => 'Assignment 1',
            'grade' => 100,
            'deadline' => '2023-08-12',
            'description' => 'First Computer Science Assignment',
            'file_url' => "file",
            'is_quiz' => false,
        ]);
        DB::table('submissions')->insert([
            'student_id' => 4,
            "assignment_id" => 1,
            'grade' => 80,
            'feedback' => '2023-08-12',
            'file_url' => "file",
        ]);
        DB::table('meetings')->insert([
            'sender_id' => 3,
            "receiver_id" => 2,
            'link_url' => "file",
            "date" => "1999/12/23"
        ]);
        DB::table('meetings')->insert([
            'sender_id' => 3,
            "receiver_id" => 2,
            'link_url' => "file",
            "date" => "1969/12/23"
        ]);
    }
}
