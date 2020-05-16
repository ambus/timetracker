import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './modules/notes/auth.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/reports',
    pathMatch: 'full',
  },
  {
    path: 'user',
    loadChildren: () => import('./modules/user/user.module').then((m) => m.UserModule),
  },
  {
    path: 'reports',
    loadChildren: () => import('./modules/reports/reports.module').then((m) => m.ReportsModule),
    canLoad: [AuthGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AppRoutingModule {}
