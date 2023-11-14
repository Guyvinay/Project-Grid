import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './user-management/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { UserLoginComponent } from './user-management/user-login/user-login.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { LandingPageComponent } from './dashboard/landing-page/landing-page.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';

const routes: Routes = [
  {path:'', redirectTo:'/briefing', pathMatch:'full'},
  {path:'briefing', component:LandingPageComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:UserLoginComponent},
  {path:'userDashboard', component:UserDashboardComponent},
  {path:'adminDashboard', component:AdminDashboardComponent},
  {path:'managerDashboard', component:ManagerDashboardComponent},
  {path:'projects', component:ProjectManagementComponent},
  {path:'users', component:UserManagementComponent},
  {path:'tasks', component:TaskManagementComponent},
  {path:'teams', component:TeamManagementComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
