import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'help',
    loadChildren: () => import('./modules/help/help.module').then(m => m.HelpModule),
  },
  {
    path: 'ticket',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule),
  },
  {
    path: 'enrollment',
    loadChildren: () => import('./modules/enrollment/enrollment.module').then(m => m.EnrollmentModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentRoutingModule { }
