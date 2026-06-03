import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../istudent';
import { StudentAdd } from '../student-add/student-add';
import { StudentEdit } from '../student-edit/student-edit';
import { StudentDetails } from '../student-details/student-details';
import { StudentService } from '../student';  // ← استوردنا الـ Service

@Component({
  selector: 'app-student-list',
  imports: [CommonModule, FormsModule, StudentAdd, StudentEdit, StudentDetails],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList {

  selectedForEdit: IStudent | null = null;
  selectedForDetails: IStudent | null = null;
  showAddForm: boolean = false;

  constructor(private studentService: StudentService) {}

  get students(): IStudent[] {
    return this.studentService.getStudents();
  }

  handleAdd(newStudent: IStudent) {
    this.studentService.addStudent(newStudent);
    this.showAddForm = false;
  }

  handleEdit(updatedStudent: IStudent) {
    this.studentService.updateStudent(updatedStudent);
    this.selectedForEdit = null;
  }

  editStudent(student: IStudent) {
    this.selectedForEdit = { ...student };
    this.selectedForDetails = null;
    this.showAddForm = false;
  }

  viewDetails(student: IStudent) {
    this.selectedForDetails = student;
    this.selectedForEdit = null;
    this.showAddForm = false;
  }
}

