import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Pacientes } from '../interfaces/pacientes';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { Razas } from '../interfaces/razas';
import { Especies } from '../interfaces/especies';
import { TipoDocumento } from '../interfaces/tipo-documento';

@Component({
  selector: 'app-crear-paciente',
  templateUrl: './crear-paciente.component.html',
  styleUrls: ['./crear-paciente.component.scss']
})
export class CrearPacienteComponent implements OnInit {

  public paciente:Pacientes[] = [];

  errorMessage:String="";

  razas:Razas[] = [];
  especies:Especies[] = [];
  tipoDocumentos:TipoDocumento[] = [];

  selectRaza:Razas = {nmidraza:0, dsnombre:"", nmidespecie:{nmidespecie:0, dsnombre:""}}


  // crearpaciente: Pacientes = this.formBuider.group({
  crearpaciente: FormGroup = this.formBuider.group({
    dsnombre: ['',[Validators.required]],
    nmidespecie: new FormGroup({
      nmidespecie: new FormControl('')
    }),
    nmidraza: new FormGroup({
      nmidraza: new FormControl('')
    }),
    fenacimiento: ['',Validators.required],
    nmidtipoidentificacion: new FormGroup({
      nmidtipoidentificacion: new FormControl('')
    }),
    nmidentificacion: ['',[Validators.required]],
    dsduenio: ['',[Validators.required]],
    dsciudad: ['',[Validators.required]],
    dsdireccion: ['',[Validators.required]],
    nmtelefono: ['',[Validators.required]],
    feregistro: ['',[Validators.required]],

  });

  constructor(private formBuider:FormBuilder, private pacientesService:PacientesService, private router: Router ) { }

  ngOnInit(): void {
    this.obtenerRazas();
    this.optenerEspecies();
    this.optenerTipoDocumentos();
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

  }

  obtenerRazas(){
    this.pacientesService.getRazas(environment.urlApi+"getRazas")
    .subscribe((razas: any)=>{
      this.razas = razas;
      console.log("razas", this.razas)
    })
  }


  optenerEspecies(){
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


}
