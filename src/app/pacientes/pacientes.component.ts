import { Component, OnChanges, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { environment } from 'src/environments/environment';
import { Pacientes } from '../interfaces/pacientes';
import { Router } from '@angular/router';
import { Personas } from '../interfaces/personas';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit, OnChanges {

  errorMessage:String="";
  //pacientes?:Pacientes;
  public paciente:Pacientes[] = [];
  pacientes:Pacientes[]=[];
  persona:Personas[] = [];

  constructor(private pacientesService:PacientesService, private router:Router){
    // this.pacientesService.getPacientes(environment.urlApi+"pacientes").subscribe({
    //   next: (pacientesData: any) => {
    //     this.paciente=pacientesData;
    //   },
    //   error: (errorData) => {
    //     this.errorMessage=errorData;
    //   },
    //   complete: () =>{
    //     console.info("Paciente Data ok");
    //   }
    // })
  }

  ngOnInit(): void {
    this.optenerPacientes();

  }
  ngOnChanges ():void{
    this.optenerPacientes();
  }

  optenerPacientes(){
    this.pacientesService.getPacientes(environment.urlApi+"pacientes")
    .subscribe((paciente: any)=>{
      this.paciente = paciente;
    });
  }

  borrarPaciente(paciente: Pacientes){
    const ok = confirm('¿Estás seguro de eliminar este paciente?');

    if (ok){
      this.pacientesService.deletePaciente(paciente)
      .subscribe(data=>{
        this.pacientes = this.paciente.filter(p=>p!==paciente);
        console.log("Usuario eliminado");
        this.optenerPacientes();
      });
    }
  }

  updatePaciente(paciente:Pacientes):void{
    localStorage.setItem("id", paciente.nmid.toString());
    this.router.navigate(["updatePaciente"]);
  }

  updatePersona(persona:Pacientes):void{
    localStorage.setItem("id", persona.nmidpersona.nmidpersona.toString());
    this.router.navigate(["updatePersona"]);
  }

}
