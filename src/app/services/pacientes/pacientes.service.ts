import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Especies } from 'src/app/interfaces/especies';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { Razas } from 'src/app/interfaces/razas';
import { TipoDocumento } from 'src/app/interfaces/tipo-documento';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http:HttpClient) { }

  // getPacientes(){
  //   return this.http.get(environment.urlApi+"pacientes");
  // }

  getPacientes(pacientes:String):Observable<Pacientes>{
    return this.http.get<Pacientes>(environment.urlApi+"getPacientes").pipe(
      catchError(this.handleError)
    )
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else{
      console.error('El backend retornó el código de estado ', error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  }

  crearPaciente(paciente:Pacientes){
    return this.http.post<Pacientes>(environment.urlApi+"pacientes/crear", paciente)
  }

  deletePaciente(paciente:Pacientes){
    return this.http.delete<Pacientes>(environment.urlApi+"pacientes/"+paciente.nmid)
  }

  getPacienteId(id:number){
    return this.http.get<Pacientes>(environment.urlApi+"getPacienteId/"+id)//terminar de hacer
  }

  updatePaciente(paciente:Pacientes){
    return this.http.put<Pacientes>(environment.urlApi+"pacientes/update/"+paciente.nmid, paciente)
  }



  getRazas(razas:String):Observable<Razas>{
    return this.http.get<Razas>(environment.urlApi+"getRazas").pipe(
      catchError(this.handleError)
    )
  }

  getEspecies(especies:String):Observable<Especies>{
    return this.http.get<Especies>(environment.urlApi+"getEspecies").pipe(
      catchError(this.handleError)
    )
  }

  getTipoDocumento(especies:String):Observable<TipoDocumento>{
    return this.http.get<TipoDocumento>(environment.urlApi+"getTiposDocumentos").pipe(
      catchError(this.handleError)
    )
  }

  exportPacientes(){
    return this.http.get(environment.urlApi+"exportPacientes", {observe: 'response', responseType: 'blob'})
  }


}
