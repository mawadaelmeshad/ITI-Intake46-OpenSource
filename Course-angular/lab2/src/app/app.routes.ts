import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./student-list/student-list').then((m) => m.StudentList),
    children: [
      {
        path: 'delete/:id',
        loadComponent: () => import('./student-delete-page/student-delete-page').then((m) => m.StudentDeletePage),
      },
      {
        path: ':id',
        loadComponent: () => import('./student-detail-page/student-detail-page').then((m) => m.StudentDetailPage),
      },
    ],
  },
  {
    path: 'about',
    loadComponent: () => import('./about/about').then((m) => m.About),
  },
  {
    path: 'contact',
    loadComponent: () => import('./contact/contact').then((m) => m.Contact),
  },
];
