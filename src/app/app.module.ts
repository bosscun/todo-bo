import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './pages/login/login.component';
import { MainComponent } from './pages/main/main.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { SignupComponent } from './pages/signup/signup.component';
import { UserComponent } from './pages/main/user/user.component';
import { TodoComponent } from './pages/main/todo/todo.component';
import { SDKBrowserModule } from './api';
import { NoteComponent } from './pages/main/note/note.component';
import { ResetPasswordsComponent } from './pages/reset-passwords/reset-passwords.component';
import { ForgotPasswordsComponent } from './pages/forgot-passwords/forgot-passwords.component';
import { BASE_PATH, DefaultService, NoteService, TodoService } from './apiNestJs';
import { environment } from '../environments/environment';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  {
    path: 'main', component: MainComponent, children: [
      { path: '', redirectTo: '/main/user', pathMatch: 'full' },
      { path: 'user', component: UserComponent },
      { path: 'todo', component: TodoComponent },
      { path: 'todo/:id/note', component: NoteComponent }
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'reset-passwords', component: ResetPasswordsComponent },
  { path: 'forgot-passwords', component: ForgotPasswordsComponent }
];


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    MainComponent,
    SignupComponent,
    UserComponent,
    TodoComponent,
    NoteComponent,
    ResetPasswordsComponent,
    ForgotPasswordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(routes),
    SDKBrowserModule.forRoot()
  ],
  providers: [
    { provide: BASE_PATH, useValue: environment.api },
    TodoService,
    NoteService,
    DefaultService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
