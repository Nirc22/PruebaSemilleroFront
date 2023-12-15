import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
//import { AuthGuard } from './guard/auth.guard';
import { PacientesComponent } from './pacientes/pacientes.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { CrearPacienteComponent } from './crear-paciente/crear-paciente.component';
import { UpdatePacienteComponent } from './update-paciente/update-paciente.component';
import { UpdatePersonaComponent } from './update-persona/update-persona.component';
import { CrearPersonaComponent } from './crear-persona/crear-persona.component';
import { AuthGuard } from './helpers/auth.guard';
import { from } from 'rxjs';


const routes: Routes = [
  {
    path:'', redirectTo:'/login', pathMatch:'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crearPaciente',
    component: CrearPacienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updatePaciente',
    component: UpdatePacienteComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'crearPersona',
    component: CrearPersonaComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'updatePersona',
    component: UpdatePersonaComponent,
    canActivate: [AuthGuard]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
