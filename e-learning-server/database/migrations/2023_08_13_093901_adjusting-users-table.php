<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('user_types', function (Blueprint $table) {
            $table->dropColumn('_rules');
            $table->json('rules')->after('name');
        });
    }

    public function down(): void
    {
    }
};
