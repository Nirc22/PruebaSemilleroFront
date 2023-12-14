import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms'
import { Pacientes } from '../interfaces/pacientes';
import { PacientesService } from '../services/pacientes/pacientes.service';
import { environment } from 'src/environments/environment';
import { Razas } from '../interfaces/razas';
import { Especies } from '../interfaces/especies';
import { TipoDocumento } from '../interfaces/tipo-documento';
import { Router } from '@angular/router';

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

  id = 0;

  updatepaciente: FormGroup = this.formBuilder.group({
    dsnombre: ['',[Validators.required]],
    nmidespecie: new FormGroup({
      nmidespecie: new FormControl(''),
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

  constructor(private formBuilder:FormBuilder, private pacientesService:PacientesService, private router:Router ) { }

  ngOnInit(): void {
    this.updatePaciente();
    this.obtenerRazas();
    this.obtenerEspecies();
    this.optenerTipoDocumentos();
  }

  updatePaciente() {
    let id = Number(localStorage.getItem("id"));
    this.pacientesService.getPacienteId(id)
      .subscribe((data: any) =>{
        this.paciente = data;
        console.log(this.paciente)

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

}
