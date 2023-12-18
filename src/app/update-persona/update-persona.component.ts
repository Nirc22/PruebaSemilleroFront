import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { Router } from '@angular/router';
import { PersonasService } from '../services/personas/personas.service';
import { Personas } from '../interfaces/personas';
import { environment } from 'src/environments/environment';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Component({
  selector: 'app-update-persona',
  templateUrl: './update-persona.component.html',
  styleUrls: ['./update-persona.component.scss']
})
export class UpdatePersonaComponent implements OnInit {

  //personas:Personas[] = [];
  persona:Personas[] = [];
  tipoDocumentos:TipoDocumento[] = [];

  updatepersona: FormGroup = this.formBuilder.group({
    nmidpersona: '',
    nmidtipoidentificacion: new FormGroup({
      nmidtipoidentificacion: new FormControl({value:'', disabled: true}),
    }),
    nmidentificacion: new FormControl({value:'', disabled: true},[Validators.required]),
    dsnombre: new FormControl({value:'', disabled: true},[Validators.required]),
    dsapellido: new FormControl({value:'', disabled: true},[Validators.required]),
    dsciudad: new FormControl('',Validators.required),
    dsdireccion: ['',[Validators.required]],
    nmtelefono: ['',[Validators.required]]

  });

  constructor(private formBuilder:FormBuilder, private pacientesService:PacientesService, private router:Router, private personasService:PersonasService ) { }

  ngOnInit(): void {
    this.getPersonaId();
    this.optenerTipoDocumentos();
  }

  get dsciudad(){
    return this.updatepersona.get('dsciudad') as FormControl;
  }

  get dsdireccion(){
    return this.updatepersona.get('dsdireccion') as FormControl;
  }

  get nmtelefono(){
    return this.updatepersona.get('nmtelefono') as FormControl;
  }

  getPersonaId(){
    let id = Number(localStorage.getItem("id"));
    this.personasService.getPersonaId(id)
      .subscribe((data:any) =>{
        this.persona = data;
        this.updatepersona.setValue({
          nmidpersona: data.nmidpersona,
          nmidtipoidentificacion: {nmidtipoidentificacion: data.nmidtipoidentificacion.nmidtipoidentificacion},
          nmidentificacion: data.nmidentificacion,
          dsnombre: data.dsnombre,
          dsapellido: data.dsapellido,
          dsciudad: data.dsciudad,
          dsdireccion: data.dsdireccion,
          nmtelefono: data.nmtelefono,
        })
      })

  }

  updatePersona(){
    const persona = this.updatepersona.value;
    console.log("Update", persona)
    this.personasService.updatePersona(persona)
      .subscribe((data:any) =>{
        this.persona = data;
        console.log("Persona Actualizada");
        this.router.navigate(['dashboard']);
      })


  }

  optenerTipoDocumentos(){
    this.pacientesService.getTipoDocumento(environment.urlApi+"getTiposDocumentos")
    .subscribe((tipoDocumentos: any)=>{
      this.tipoDocumentos = tipoDocumentos;
      console.log("Documentos", this.tipoDocumentos)
    });
  }

  volver(){
    this.router.navigate(['dashboard']);
    localStorage.removeItem("id")
  }

}
