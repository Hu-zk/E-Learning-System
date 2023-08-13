<?php

namespace App\Http\Controllers\Student;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class StudentController extends Controller
{
    //
    function test()
    {

        return response()->json([
            'data' => Auth::user()
        ]);
    }
}
