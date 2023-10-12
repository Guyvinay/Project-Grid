import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegistrationComponent } from './user-management/registration/registration.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AdminAuthsComponent } from './admin-auths/admin-auths.component';
import { AddProjectComponent } from './project-management/add-project/add-project.component';
import { UserLoginComponent } from './user-management/user-login/user-login.component';
import { UserManagementComponent } from './user-management/user-management.component';

const routes: Routes = [
  {path:'', redirectTo:'/login', pathMatch:'full'},
  {path:'registration', component:RegistrationComponent},
  {path:'login', component:UserLoginComponent},
  {path:'dashboard', component:DashboardComponent},
  {path:'admin', component:AdminAuthsComponent},
  {path:'addProject', component:AddProjectComponent},
  {path:'userm', component:UserManagementComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
