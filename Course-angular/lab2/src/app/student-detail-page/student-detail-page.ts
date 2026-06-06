import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { StudentService } from '../student';
import { IStudent } from '../istudent';

@Component({
  selector: 'app-student-detail-page',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './student-detail-page.html',
  styleUrl: './student-detail-page.css',
})
export class StudentDetailPage implements OnInit {
  student: IStudent | null = null;
  loading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentService: StudentService
  ) {}

  ngOnInit() {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (!id) {
      this.errorMessage = 'Invalid student id.';
      this.loading = false;
      return;
    }

    this.studentService.getStudentById(id).subscribe({
      next: (student) => {
        this.student = student;
        this.loading = false;
      },
      error: () => {
        this.errorMessage = 'Student not found.';
        this.loading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }
}
