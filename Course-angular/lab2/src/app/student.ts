import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IStudent } from './istudent';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = 'http://localhost:3000/students';

  constructor(private http: HttpClient) {}

  getStudents(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(this.baseUrl);
  }

  getStudentById(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.baseUrl}/${id}`);
  }

  addStudent(student: Omit<IStudent, 'id'>): Observable<IStudent> {
    return this.http.post<IStudent>(this.baseUrl, student);
  }

  updateStudent(student: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(`${this.baseUrl}/${student.id}`, student);
  }

  deleteStudent(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}
