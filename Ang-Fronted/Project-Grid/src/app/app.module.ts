import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './initials/login/login.component';
import { RegisterComponent } from './initials/register/register.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgxSpinnerModule } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminDashboardComponent } from './dashboard/admin-dashboard/admin-dashboard.component';
import { UserDashboardComponent } from './dashboard/user-dashboard/user-dashboard.component';
import { ManagerDashboardComponent } from './dashboard/manager-dashboard/manager-dashboard.component';
import { TeamComponent } from './team/team.component';
import { TaskComponent } from './task/task.component';
import { UserComponent } from './user/user.component';
import { ProjectComponent } from './project/project.component';
import { InitsComponent } from './initials/inits/inits.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    AdminDashboardComponent,
    UserDashboardComponent,
    ManagerDashboardComponent,
    TeamComponent,
    TaskComponent,
    UserComponent,
    ProjectComponent,
    InitsComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxSpinnerModule,
    BrowserAnimationsModule, 
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
