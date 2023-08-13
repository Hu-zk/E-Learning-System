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
        // DB::table('user_types')->insert([
		// 	'name' => "admin",
        //     '_rules' => "",
        //     'created_at' => date('Y-m-d'),
        //     'updated_at' => date('Y-m-d')
        // ]);

        // DB::table('user_types')->insert([
		// 	'name' => "teacher",
        //     '_rules' => "",
        //     'created_at' => date('Y-m-d'),
        //     'updated_at' => date('Y-m-d')
        // ]);

        // DB::table('user_types')->insert([
		// 	'name' => "parent",
        //     '_rules' => "",
        //     'created_at' => date('Y-m-d'),
        //     'updated_at' => date('Y-m-d')
        // ]);

        // DB::table('user_types')->insert([
		// 	'name' => "student",
        //     '_rules' => "",
        //     'created_at' => date('Y-m-d'),
        //     'updated_at' => date('Y-m-d')
        // ]);

        DB::table('users')->insert([
            'user_type_id' => 1,
            'parent_id' => 0,
            'name' => 'Hussien',
            'email' => 'hsn@gmail.com',
            'password' => Hash::make('123456')
        ]);
    }
}
