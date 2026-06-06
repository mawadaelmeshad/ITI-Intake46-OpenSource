import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { IStudent } from '../istudent';
import { StudentAdd } from '../student-add/student-add';
import { StudentEdit } from '../student-edit/student-edit';
import { StudentService } from '../student';

@Component({
  selector: 'app-student-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule, StudentAdd, StudentEdit],
  templateUrl: './student-list.html',
  styleUrl: './student-list.css',
})
export class StudentList implements OnInit {

  students: IStudent[] = [];
  selectedForEdit: IStudent | null = null;
  showAddForm = false;
  loading = false;

  constructor(private studentService: StudentService) {}

  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading = true;
    this.studentService.getStudents().subscribe({
      next: (students) => {
        this.students = students;
        this.loading = false;
      },
      error: () => {
        this.students = [];
        this.loading = false;
      },
    });
  }

  handleAdd(newStudent: Omit<IStudent, 'id'>) {
    this.studentService.addStudent(newStudent).subscribe(() => {
      this.loadStudents();
      this.showAddForm = false;
    });
  }

  handleEdit(updatedStudent: IStudent) {
    this.studentService.updateStudent(updatedStudent).subscribe(() => {
      this.selectedForEdit = null;
      this.loadStudents();
    });
  }

  editStudent(student: IStudent) {
    this.selectedForEdit = { ...student };
    this.showAddForm = false;
  }
}

