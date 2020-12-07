import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  {
    path: 'dashboard',
    loadChildren: () => import('./modules/dashboard/dashboard.module').then(m => m.DashboardModule),
  },
  {
    path: 'training',
    loadChildren: () => import('./modules/training/training.module').then(m => m.TrainingModule),
  },
  {
    path: 'ticket',
    loadChildren: () => import('./modules/ticket/ticket.module').then(m => m.TicketModule),
  },
  {
    path: 'faq',
    loadChildren: () => import('./modules/faq/faq.module').then(m => m.FAQModule),
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TeacherRoutingModule { }
