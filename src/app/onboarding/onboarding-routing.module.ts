import { TeacherProcessComponent } from './components/teacher-process/teacher-process.component';
import { StudentProcessComponent } from './components/student-process/student-process.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { StudentProcessGuard } from './guards/student-process.guard';
import { TeacherProcessGuard } from './guards/teacher-process.guard';


const routes: Routes = [
  { path: '', redirectTo: 'student-process', pathMatch: 'full' },
  {
    path: 'student-process',
    canActivate: [StudentProcessGuard],
    component: StudentProcessComponent
  },
  {
    path: 'teacher-process',
    canActivate: [TeacherProcessGuard],
    component: TeacherProcessComponent
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OnboardingRoutingModule { }
