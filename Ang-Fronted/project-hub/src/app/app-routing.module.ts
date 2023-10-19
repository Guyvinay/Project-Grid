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
import { ListProjectComponent } from './project-management/list-project/list-project.component';
import { UnitProjectComponent } from './project-management/unit-project/unit-project.component';

const routes: Routes = [
  {path:'', redirectTo:'/briefing', pathMatch:'full'},
  {path:'briefing', component:LandingPageComponent},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:UserLoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'userDashboard', component:UserDashboardComponent},
  {path:'adminDashboard', component:AdminDashboardComponent},
  {path:'managerDashboard', component:ManagerDashboardComponent},
  {path:'project', component:ProjectManagementComponent},
  {path:'listProject', component:ListProjectComponent},
  {path:'userm', component:UserManagementComponent},
  {path:'unitProject', component:UnitProjectComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
