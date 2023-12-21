import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Pacientes } from '../interfaces/pacientes';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { PersonasService } from '../services/personas/personas.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Razas } from '../interfaces/razas';
import { Especies } from '../interfaces/especies';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { Personas } from '../interfaces/personas';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.scss']
})
export class CrearPacienteComponent implements OnInit {

  public paciente:Pacientes[] = [];

  errorMessage:String="";

  razas:Razas[] = [];
  raza:Razas[] = [];
  razasData:Razas[] = [];
  especies:Especies[] = [];
  personas:Personas[] = [];

  //selectRaza:Razas = {nmidraza:0, dsnombre:"", nmidespecie:{nmidespecie:0, dsnombre:""}};
  selectEspecies:Especies = {nmidespecie: 0, dsnombre: ""};


  // crearpaciente: Pacientes = this.formBuider.group({
  crearpaciente: FormGroup = this.formBuider.group({
    dsnombre: ['',[Validators.required]],
    nmidespecie: new FormGroup({
      nmidespecie: new FormControl(''),
    }),
    nmidraza: new FormGroup({
      nmidraza: new FormControl('')
    }),
    fenacimiento: ['',[Validators.required]],
    feregistro: ['',[Validators.required]],
    nmidpersona: new FormGroup({
      nmidpersona: new FormControl('')
    }),
  });

  constructor(private formBuider:FormBuilder, private pacientesService:PacientesService, private router: Router, private personasService:PersonasService) { }

  ngOnInit(): void {
    this.obtenerRazas();
    this.obtenerEspecies();
    this.obtenerPersonas();
  }

  get dsnombre(){
    return this.crearpaciente.get('dsnombre') as FormControl;
  }

  get fenacimiento(){
    return this.crearpaciente.get('fenacimiento') as FormControl;
  }

  get feregistro(){
    return this.crearpaciente.get('feregistro') as FormControl;
  }

  get nmidespecie(){
    return this.crearpaciente.get('nmidespecie') as FormControl;
  }

  get nmidraza(){
    return this.crearpaciente.get('nmidraza') as FormControl;
  }

  get nmidpersona(){
    return this.crearpaciente.get('nmidpersona') as FormControl;
  }



  crearPaciente(){
    const paciente = this.crearpaciente.value;
    console.log("paciente", paciente);

    this.pacientesService.crearPaciente(paciente)
      .subscribe((data: any)=>{
        this.paciente = data;
        console.log("Paciente registrado");
        this.router.navigate(['dashboard']);
    })

  }

  obtenerRazas(){
    this.pacientesService.getRazas(environment.urlApi+"getRazas")
    .subscribe((razas: any)=>{
      this.razas = razas;
      console.log("razas", this.razas)
    })
  }


  obtenerEspecies(){
    this.pacientesService.getEspecies(environment.urlApi+"getEspecies")
    .subscribe((especies: any)=>{
      this.especies = especies;
      console.log("especies", this.especies)
    });
  }



  obtenerPersonas(){
    this.personasService.getPersonas(environment.urlApi+"getPersonas")
      .subscribe((personas: any)=>{
      this.personas = personas;
      console.log("Personas", this.personas)
    });
  }

  onSelectEspecies($event: any){
    this.raza = this.razas.filter(item => item.nmidespecie.nmidespecie == this.selectEspecies.nmidespecie);
    console.log("Razassss", this.raza)
  }

  volver(){
    this.pacientesService.getPacientes(environment.urlApi+"pacientes")
    .subscribe((paciente: any)=>{
      this.paciente = paciente;
    });
    this.router.navigate(['dashboard']);
  }



}
