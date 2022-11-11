<?php

namespace App\Http\Controllers\API;

use App\Http\Controllers\Controller;
use App\Models\Student;
use Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class StudentController extends Controller
{
    public function index() {
        $students = Student::all() ;
        return response()->json([
            "status" => 200,
            "students" => $students ,
        ]) ;
    }

    public function store(Request $request)
    {

        $validator = Validator::make($request->all(), [
            'fullname' => 'required|max:50',
            'city' => 'required|max:50',
            'email' => 'required|email|max:50',
        ]) ;

        if($validator->fails()) {
            return response()->json([
                "validate_err" => $validator->messages() ,
            ]) ;
        }else {
            $student = new Student() ;
            // $image = $request->file('cover') ;
            // $destination = "images/" ;
            // $coverName = time() . "." . $image->getClientOriginalExtension() ;
            // $image->move($destination, $coverName) ;
            $student->fullname = $request->fullname ;
            $student->city = $request->city ;
            $student->email = $request->email ;
            // $student->cover = $coverName ;
            $student->save() ;
    
            return response()->json([
                "status" => 200,
                "message" => "Student Added Successfuly"
            ]) ;
        }

    }

    public function show($id) {
        $student = Student::find($id) ;
        return response()->json([
            "status" => 200,
            "student" => $student   
        ]) ;
    }

    public function edit($id) {
        $student = Student::find($id) ;
        if($student){
            return response()->json([
                "status" => 200,
                "student" => $student   
            ]) ;
        }else {
            return response()->json([
                "status" => 404,
                "message" => "No Student With taht ID"   
            ]) ;
        }
    }

    public function update(Request $request, $id)
    {
        $validator = Validator::make($request->all(), [
            'fullname' => 'required|max:50',
            'city' => 'required|max:50',
            'email' => 'required|email|max:50',
        ]) ;

        if($validator->fails()) {
            return response()->json([
                "validate_err" => $validator->messages() ,
            ]) ;
        }else {
            $student = Student::find($id) ;
            $student->fullname = $request->fullname ;
            $student->city = $request->city ;
            $student->email = $request->email ;
            $student->update() ;
            return response()->json([
                "status" => 200,
                "message" => "Student Updated Successfully"
            ]) ;
        }
    }
  
    public function delete($id) {
        $student = Student::find($id) ;
        $student->delete() ;
        return response()->json([
            "status" => 200,
            "message" => "Student Deleted Successfully"
        ]) ;
    }
}
