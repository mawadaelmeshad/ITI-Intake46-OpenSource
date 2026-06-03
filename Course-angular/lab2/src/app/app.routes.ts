import { Routes } from '@angular/router';
import { StudentList } from './student-list/student-list';
import { About } from './about/about';
import { Contact } from './contact/contact';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: StudentList },
  { path: 'about', component: About },
  { path: 'contact', component: Contact },
];
