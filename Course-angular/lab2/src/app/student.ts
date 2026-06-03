import { Injectable } from '@angular/core';
import { IStudent } from './istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {

  private students: IStudent[] = [
    { id: 1, name: 'Ahmed', age: 20 },
    { id: 2, name: 'Sara', age: 21 },
  ];

  getStudents(): IStudent[] {
    return this.students;
  }

  addStudent(student: IStudent): void {
    student.id = this.students.length + 1;
    this.students.push(student);
  }

  updateStudent(updated: IStudent): void {
    const index = this.students.findIndex(s => s.id === updated.id);
    if (index !== -1) {
      this.students[index] = updated;
    }
  }
}
