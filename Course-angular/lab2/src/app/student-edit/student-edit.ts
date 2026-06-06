import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IStudent } from '../istudent';

@Component({
  selector: 'app-student-edit',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './student-edit.html',
  styleUrl: './student-edit.css',
})
export class StudentEdit {
  @Input() studentToEdit: IStudent | null = null;
  @Output() onStudentSave = new EventEmitter<IStudent>();

  saveStudent() {
    if (this.studentToEdit && this.studentToEdit.name && this.studentToEdit.age > 0) {
      this.onStudentSave.emit({ ...this.studentToEdit });
    }
  }
}
