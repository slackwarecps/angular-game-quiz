import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './component/admin/admin.component';
import { Form1Component } from './component/form1/form1.component';
import { JogoComponent } from './component/jogo/jogo.component';
import { LoginComponent } from './component/login/login.component';
import { PreJogoComponent } from './component/pre-jogo/pre-jogo.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'form1', component: Form1Component },
  { path: 'login', component: LoginComponent },
  { path: 'pre-jogo', component: PreJogoComponent },
  { path: 'admin', component: AdminComponent },
  { path: 'jogo/:id', component: JogoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
