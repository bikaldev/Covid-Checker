import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BodyComponent } from './body/body.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { AboutComponent } from './about/about.component';
import { HistoryComponent } from './history/history.component';
import { HistoryCardComponent } from './history/history-card/history-card.component';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router';
import {HttpClientModule} from '@angular/common/http'
import { RegisterComponent } from './register/register.component';


import { BackendService } from './services/backend.service';
import { AuthService } from './services/auth.service';
import { PatientService } from './services/patient.service';
import { DropdownDirective } from './directives/app-dropdown.directive';
import { HistoryService } from './services/history.service';
import { PatientListComponent } from './patient-list/patient-list.component';
import { PatientCardComponent } from './patient-card/patient-card.component';
import { AnalyzerComponent } from './analyzer/analyzer.component';

const approutes: Routes = [
  {path: '', component:BodyComponent},
  {path: 'home', component:BodyComponent},
  {path: 'register', component: RegisterComponent},
  {path:'patient',component:PatientListComponent},
  {path: 'login', component:LoginComponent},
  {path: 'signup', component:SignupComponent},
  {path: 'history/:patientId/:name/:age/:gender', component:HistoryComponent},
  {path: 'about', component:AboutComponent}, 
  {path: 'analyze/:patientId/:name/:age/:gender', component: AnalyzerComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BodyComponent,
    LoginComponent,
    SignupComponent,
    AboutComponent,
    HistoryComponent,
    DropdownDirective,
    HistoryCardComponent,
    RegisterComponent,
    PatientListComponent,
    PatientCardComponent,
    AnalyzerComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(approutes),
    HttpClientModule

  ],
  providers: [BackendService, AuthService, HistoryService, PatientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
