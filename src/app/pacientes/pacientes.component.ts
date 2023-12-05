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
  //pacientes?:Pacientes;
  public paciente:Pacientes[] = [];
  pacientes:Pacientes[]=[];

  constructor(private pacientesService:PacientesService){
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

  optenerPacientes(){
    this.pacientesService.getPacientes(environment.urlApi+"pacientes")
    .subscribe((paciente: any)=>{
      this.paciente = paciente;
    });
  }

  borrarPaciente(paciente: Pacientes){
    this.pacientesService.deletePaciente(paciente)
      .subscribe(data=>{
        this.pacientes = this.paciente.filter(p=>p!==paciente);
        console.log("Usuario eliminado");
        this.optenerPacientes();
      })

  }

}
