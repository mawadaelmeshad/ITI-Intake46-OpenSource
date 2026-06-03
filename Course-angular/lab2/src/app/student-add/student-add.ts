import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../istudent';

@Component({
  selector: 'app-student-add',
  imports: [CommonModule, FormsModule],
  templateUrl: './student-add.html',
  styleUrl: './student-add.css'
})
export class StudentAdd {
  @Output() onStudentAdd = new EventEmitter<IStudent>();

  newStudent: IStudent = { id: 0, name: '', age: 0 };

  addStudent() {
    if (this.newStudent.name && this.newStudent.age > 0) {
      this.onStudentAdd.emit({ ...this.newStudent });
      this.newStudent = { id: 0, name: '', age: 0 }; // reset
    }
  }
}
