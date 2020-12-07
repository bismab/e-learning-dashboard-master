import { UserApprovalInfoLevelCheckGuard } from './../core/guards/user-approval-info-level-check.guard';
import { Routes } from '@angular/router';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import { BlankComponent } from './layouts/blank/blank.component';
import { AuthGuard } from 'core/guards/auth.guard';
import { AntiApprovalInfoLevelGuard } from 'core/guards/anti-approval-info-level.guard';
import { TeacherGuard } from 'core/guards/teacher.guard';
import { StudentGuard } from 'core/guards/student.guard';
import { AuthRoutesAppearanceGuard } from 'core/guards/auth-routes-appearance.guard';
import { EmailVerifyRedirectPageComponent } from './shared/email-verify-redirect-page/email-verify-redirect-page.component';

export const AppRoutes: Routes = [
  {
    path: '',
    redirectTo: 'onboarding',
    pathMatch: 'full',
  },
  {
    path: '',
    component: BlankComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'onboarding',
        canLoad: [AntiApprovalInfoLevelGuard],
        loadChildren: () => import('./onboarding/onboarding.module').then(m => m.OnboardingModule)
      }
    ]
  },
  {
    path: '',
    component: AdminLayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'teacher',
        canLoad: [UserApprovalInfoLevelCheckGuard, TeacherGuard],
        loadChildren: () => import('./teacher/teacher.module').then(m => m.TeacherModule)
      },
      {
        path: 'student',
        canLoad: [UserApprovalInfoLevelCheckGuard, StudentGuard],
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      }
    ]
  },
  {
    path: 'auth',
    canActivate: [AuthRoutesAppearanceGuard],
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
    ,
  },
  {
    path: 'email/verify/:token',
    component: EmailVerifyRedirectPageComponent
  },
  {
    path: '**',
    redirectTo: ''
  }
]
