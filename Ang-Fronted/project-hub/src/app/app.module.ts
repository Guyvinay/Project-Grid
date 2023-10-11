import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserManagementComponent } from './user-management/user-management.component';
import { ProjectManagementComponent } from './project-management/project-management.component';
import { TaskManagementComponent } from './task-management/task-management.component';
import { TeamManagementComponent } from './team-management/team-management.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegistrationComponent } from './user-management/registration/registration.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap'; // Import ng-bootstrap module
import { ToastrModule } from 'ngx-toastr'; // Import ngx-toastr module
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NavigationComponent } from './navigation/navigation.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu'; // If you're using a mat-menu
import { MatButtonModule } from '@angular/material/button'; 
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input'; // Import input module
import { MatCardModule } from '@angular/material/card';
import { AdminAuthsComponent } from './admin-auths/admin-auths.component'; // Import card module
import { MatTableModule } from '@angular/material/table';
import { AddProjectComponent } from './project-management/add-project/add-project.component';
import { ListProjectComponent } from './project-management/list-project/list-project.component';
import { UserLoginComponent } from './user-management/user-login/user-login.component';




@NgModule({
  declarations: [
    AppComponent,
    UserManagementComponent,
    ProjectManagementComponent,
    TaskManagementComponent,
    TeamManagementComponent,
    DashboardComponent,
    RegistrationComponent,
    NavigationComponent,
    AdminAuthsComponent,
    AddProjectComponent,
    ListProjectComponent,
    UserLoginComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    NgbModule, 
    MatToolbarModule, 
    MatMenuModule,
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatCardModule,
    MatTableModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
