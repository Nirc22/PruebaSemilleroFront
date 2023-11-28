import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, throwError } from 'rxjs';
import { Pacientes } from 'src/app/interfaces/pacientes';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PacientesService {

  constructor(private http:HttpClient) { }

  getPacientes(id:number):Observable<Pacientes>{
    return this.http.get<Pacientes>(environment.urlApi+"pacientes").pipe(
      catchError(this.handleError)
    )
  }
  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else{
      console.error('El backend retornó el código de estado ', error.status, error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  }
}
