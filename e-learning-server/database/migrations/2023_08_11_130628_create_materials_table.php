<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('materials', function (Blueprint $table) {
            $table->id();
            $table->integer('course_id');
            $table->string('description');
            $table->string('file_url');
            $table->timestamps();
        });

        Schema::create('assignments_quizes', function (Blueprint $table) {
            $table->id();
            $table->integer('course_id');
            $table->boolean('is_quiz');
            $table->string('title');
            $table->string('description');
            $table->integer('grade');
            $table->datetime('deadline');
            $table->string('file_url');
            $table->timestamps();
        });

        Schema::create('submissions', function (Blueprint $table) {
            $table->id();
            $table->integer('student_id');
            $table->integer('assignment_id');
            $table->integer('grade');
            $table->string('file_url');
            $table->timestamps();
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
