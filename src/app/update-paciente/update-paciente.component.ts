import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Pacientes } from '../interfaces/pacientes';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { environment } from 'src/environments/environment';
import { Razas } from '../interfaces/razas';
import { Especies } from '../interfaces/especies';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { Router } from '@angular/router';
import { PersonasService } from '../services/personas/personas.service';
import { Personas } from '../interfaces/personas';

@Component({
  selector: 'app-update-paciente',
  templateUrl: './update-paciente.component.html',
  styleUrls: ['./update-paciente.component.scss']
})
export class UpdatePacienteComponent implements OnInit {

  //paciente:Pacientes=new Pacientes();
  public paciente:Pacientes [] = [];

  razas:Razas[] = [];
  especies:Especies[] = [];
  tipoDocumentos:TipoDocumento[] = [];
  personas:Personas[] = [];


  updatepaciente: FormGroup = this.formBuilder.group({
    nmid:'',
    dsnombre: new FormControl({value:'', disabled: true}),
    nmidespecie: new FormGroup({
      nmidespecie: new FormControl({value: '', disabled: true}),
    }),
    nmidraza: new FormGroup({
      nmidraza: new FormControl({value:'', disabled: true}),
    }),
    fenacimiento: new FormControl ({value:'', disabled: true },Validators.required),
    nmidpersona: new FormGroup({
      nmidpersona: new FormControl(''),
    }),
    feregistro: new FormControl({value: '', disabled: true},Validators.required),
  });

  constructor(private formBuilder:FormBuilder, private pacientesService:PacientesService, private router:Router, private personasService:PersonasService ) { }

  ngOnInit(): void {
    this.getPacienteId();
    this.obtenerRazas();
    this.obtenerEspecies();
    this.optenerTipoDocumentos();
    this.obtenerPersonas();
  }

  getPacienteId() {
    let id = Number(localStorage.getItem("id"));
    this.pacientesService.getPacienteId(id)
      .subscribe((data: any) =>{
        this.paciente = data;
        console.log(this.paciente)
        localStorage.removeItem("id")
        this.updatepaciente.setValue({
          nmid: data.nmid,
          dsnombre: data.dsnombre,
          nmidespecie: {nmidespecie: data.nmidespecie.nmidespecie},
          nmidraza: {nmidraza: data.nmidraza.nmidraza},
          fenacimiento: data.fenacimiento,
          nmidpersona: {nmidpersona: data.nmidpersona.nmidpersona},
          feregistro: data.feregistro,
        })

      })
  }

  updatePaciente(){
    const paciente = this.updatepaciente.value;
    console.log("Update", paciente)
    this.pacientesService.updatePaciente(paciente)
      .subscribe((data: any)=>{
        this.paciente = data;
        console.log("Paciente actualizado");
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

  optenerTipoDocumentos(){
    this.pacientesService.getTipoDocumento(environment.urlApi+"getTiposDocumentos")
    .subscribe((tipoDocumentos: any)=>{
      this.tipoDocumentos = tipoDocumentos;
      console.log("Documentos", this.tipoDocumentos)
    });
  }

  obtenerPersonas(){
    this.personasService.getPersonas(environment.urlApi+"getPersonas")
      .subscribe((personas: any)=>{
      this.personas = personas;
      console.log("Personas", this.personas)
    });
  }

  volver(){
    this.router.navigate(['dashboard']);
    localStorage.removeItem("id")
  }

}
