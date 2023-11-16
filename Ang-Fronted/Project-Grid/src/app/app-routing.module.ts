import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './initials/register/register.component';
import { LoginComponent } from './initials/login/login.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { TaskComponent } from './task/task.component';
import { TeamComponent } from './team/team.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { InitsComponent } from './initials/inits/inits.component';

const routes: Routes = [
  {path:'register', component:RegisterComponent},
  {path:'login', component:LoginComponent},
  {path:'admin-dashboard', component:AdminDashboardComponent},
  {path:'task', component:TaskComponent},
  {path:'team', component:TeamComponent},
  {path:'user', component:UserComponent},
  {path:'project', component:ProjectComponent},
  {path:'inits', component:InitsComponent},
  {path:'', redirectTo:'/inits', pathMatch:'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
