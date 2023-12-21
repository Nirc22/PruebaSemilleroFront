import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PersonasService } from '../services/personas/personas.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { Personas } from '../interfaces/personas';
import { Pacientes } from '../interfaces/pacientes';

@Component({
  selector: 'app-crear-persona',
  templateUrl: './crear-persona.component.html',
  styleUrls: ['./crear-persona.component.scss']
})
export class CrearPersonaComponent implements OnInit {

  tipoDocumentos:TipoDocumento [] = [];
  persona:Personas[] = [];
  paciente:Pacientes[] = [];

  crearpersona: FormGroup = this.forBuilder.group({
    //nmidpersona: ['', [Validators.required]],
    nmidtipoidentificacion: new FormGroup({
      nmidtipoidentificacion: new FormControl('', Validators.required),
    }),
    nmidentificacion: ['', [Validators.required]],
    dsnombre: ['', [Validators.required]],
    dsapellido: ['', [Validators.required]],
    dsciudad: ['', [Validators.required]],
    dsdireccion: ['', [Validators.required]],
    nmtelefono: ['', [Validators.required]]

  });

  constructor(private forBuilder:FormBuilder, private personasService:PersonasService, private router:Router, private pacientesService:PacientesService) { }

  ngOnInit(): void {
    this.obtenerTipoDocumentos();
  }

  get nmidtipoidentificacion(){
    return this.crearpersona.get('nmidtipoidentificacion') as FormControl;
  }

  get nmidentificacion(){
    return this.crearpersona.get('nmidentificacion') as FormControl;
  }

  get dsnombre(){
    return this.crearpersona.get('dsnombre') as FormControl;
  }

  get dsapellido(){
    return this.crearpersona.get('dsapellido') as FormControl;
  }

  get dsciudad(){
    return this.crearpersona.get('dsciudad') as FormControl;
  }

  get dsdireccion(){
    return this.crearpersona.get('dsdireccion') as FormControl;
  }

  get nmtelefono(){
    return this.crearpersona.get('nmtelefono') as FormControl;
  }

  crearPersona(){
    const persona = this.crearpersona.value;
    console.log("persona", persona);

    this.personasService.crearPersona(persona)
      .subscribe((data:any) =>{
        this.persona = data;
        console.log("Persona registrada");
        this.router.navigate(['dashboard']);
      })
  }

  obtenerTipoDocumentos(){
    this.pacientesService.getTipoDocumento(environment.urlApi+"getTiposDocumentos")
    .subscribe((tipoDocumentos: any)=>{
      this.tipoDocumentos = tipoDocumentos;
      console.log("Documentos", this.tipoDocumentos)
    });
  }

  volver(){
    this.pacientesService.getPacientes(environment.urlApi+"pacientes")
    .subscribe((paciente: any)=>{
      this.paciente = paciente;
    });
    this.router.navigate(['dashboard']);
  }

}
