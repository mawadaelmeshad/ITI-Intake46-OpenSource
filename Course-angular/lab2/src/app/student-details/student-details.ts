import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IStudent } from '../istudent';

@Component({
  selector: 'app-student-details',
  imports: [CommonModule],
  templateUrl: './student-details.html',
  styleUrl: './student-details.css',
})
export class StudentDetails {
  @Input() student: IStudent | null = null;
}
