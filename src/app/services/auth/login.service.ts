import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { Observable, catchError, throwError, BehaviorSubject, tap } from 'rxjs';
import { Pacientes } from 'src/app/interfaces/pacientes';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<Pacientes> = new BehaviorSubject<Pacientes>({id:0, email:''});

  constructor(private http: HttpClient) { }

  login(credentials:LoginRequest):Observable<Pacientes>{
    return this.http.get<Pacientes>('././assets/data.json').pipe(
      tap( userData =>{
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true);
      }),  //no modifica la secuencia de los observables, devuelve los datos como los recibio de la fuente
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

  get userData():Observable<Pacientes>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
