import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../istudent';

@Component({
  selector: 'app-student-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css'
})
export class StudentAdd {
  @Output() onStudentAdd = new EventEmitter<Omit<IStudent, 'id'>>();

  newStudent: Omit<IStudent, 'id'> = { name: '', age: 0 };

  addStudent() {
    if (this.newStudent.name && this.newStudent.age > 0) {
      this.onStudentAdd.emit({ ...this.newStudent });
      this.newStudent = { name: '', age: 0 }; // reset
    }
  }
}
