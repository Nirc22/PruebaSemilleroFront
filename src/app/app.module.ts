import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule, FormsModule } from '@angular/forms'

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PacientesComponent } from './pacientes/pacientes.component';
import { LoginComponent } from './login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AuthInterceptor } from './helpers/auth.interceptor';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { UpdatePacienteComponent } from './update-paciente/update-paciente.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';

@NgModule({
  declarations: [
    AppComponent,
    PacientesComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    CrearPacienteComponent,
    UpdatePacienteComponent,
    CrearPersonaComponent,
    UpdatePersonaComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
