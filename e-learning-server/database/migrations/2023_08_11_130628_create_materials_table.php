<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{

    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->boolean('is_announcement');
            $table->string('description');
            $table->string('file_url');
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('assignments_quizes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('course_id');
            $table->boolean('is_quiz');
            $table->string('title');
            $table->string('description');
            $table->integer('grade');
            $table->datetime('deadline');
            $table->string('file_url');
            $table->timestamps();

            $table->foreign('course_id')->references('id')->on('courses');
        });

        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('student_id');
            $table->unsignedBigInteger('assignment_id');
            $table->integer('grade');
            $table->string('file_url');
            $table->timestamps();

            $table->foreign('student_id')->references('id')->on('users');
            $table->foreign('assignment_id')->references('id')->on('assignments_quizes');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('materials');
        Schema::dropIfExists('assignments_quizes');
        Schema::dropIfExists('submissions');
    }
};
