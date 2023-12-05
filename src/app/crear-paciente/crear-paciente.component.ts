import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { Pacientes } from '../interfaces/pacientes';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.scss']
})
export class CrearPacienteComponent implements OnInit {

  public paciente:Pacientes[] = [];

  errorMessage:String="";


  // crearpaciente: Pacientes = this.formBuider.group({
  crearpaciente: FormGroup = this.formBuider.group({
    dsnombre: ['',[Validators.required]],
    nmidespecie: ['',[Validators.required]],
    nmidraza: ['',[Validators.required]],
    fenacimiento: ['',Validators.required],
    nmidtipoidentificacion: ['',[Validators.required]],
    nmidentificacion: ['',[Validators.required]],
    dsduenio: ['',[Validators.required]],
    dsciudad: ['',[Validators.required]],
    dsdireccion: ['',[Validators.required]],
    nmtelefono: ['',[Validators.required]],
    feregistro: ['',[Validators.required]],

  });

  constructor(private formBuider:FormBuilder, private pacientesService:PacientesService, private router: Router ) { }

  ngOnInit(): void {
  }

  crearPaciente(){
    const paciente = this.crearpaciente.value;
    console.log("paciente", paciente);

    this.pacientesService.crearPaciente(paciente)
      .subscribe((data: any)=>{
        this.paciente = data;
        console.log("Paciente registrado")
        this.router.navigate(['dashboard']);;
    })

    // console.log('Values', registrarPaciente);

    // this.pacientesService.crearPaciente(values)
    // this.pacientesService.crearPaciente(registrarPaciente).subscribe({
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


    // .subscribe({
    //   next: (pacientesData: any) => {
    //     this.paciente=pacientesData;
    //   },
      // .subscribe(() => {

      // })
      // .subscribe(() =>{
      //   this.pacientesService.getPacientes()
      //     .subscribe((tareas: any) =>{
      //       console.log('Tareas', tareas);
      //       this.tareas = tareas
      //     })
      // })
  }

}
