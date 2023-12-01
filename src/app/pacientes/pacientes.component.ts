import { Component, OnInit } from '@angular/core';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { environment } from 'src/environments/environment';
import { Pacientes } from '../interfaces/pacientes';

@Component({
  selector: 'app-pacientes',
  templateUrl: './pacientes.component.html',
  styleUrls: ['./pacientes.component.scss']
})
export class PacientesComponent implements OnInit {

  errorMessage:String="";
  pacientes?:Pacientes;
  public paciente:Pacientes[] = []

  constructor(private pacientesService:PacientesService){
    this.pacientesService.getPacientes(environment.urlApi+"pacientes").subscribe({
      next: (pacientesData) => {
        this.pacientes=pacientesData;
      },
      error: (errorData) => {
        this.errorMessage=errorData;
      },
      complete: () =>{
        console.info("Paciente Data ok", this.pacientes);
      }
    })
  }

  ngOnInit(): void {

    this.pacientesService.get()
      .subscribe((paciente: any)=>{
        console.log("pacienteeeeeee", paciente)
        this.paciente = paciente;
        console.log("Paciente" , this.paciente)
      });
  }

}
