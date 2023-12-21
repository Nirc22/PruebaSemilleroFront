import { HttpClient, HttpErrorResponse, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LoginRequest } from 'src/app/interfaces/login-requets';
import { Observable, catchError, throwError, BehaviorSubject, tap, map } from 'rxjs';
import { Administrador } from 'src/app/interfaces/administrador';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  currentUserLoginOn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  currentUserData: BehaviorSubject<String> = new BehaviorSubject<String>("");

  constructor(private http: HttpClient) {
    this.currentUserLoginOn= new BehaviorSubject<boolean>(sessionStorage.getItem("token")!= null);
    this.currentUserData=new BehaviorSubject<String>(sessionStorage.getItem("token") || "")
  }

  // login(credentials:LoginRequest):Observable<any>{
  //   return this.http.post<any>(environment.urlHost+"login", credentials).pipe(
  //     tap( (userData) =>{
  //       sessionStorage.setItem("token", userData.token)
  //       this.currentUserData.next(userData.token);
  //       this.currentUserLoginOn.next(true);
  //     }),  //no modifica la secuencia de los observables, devuelve los datos como los recibio de la fuente
  //     map((userData) => userData.token),
  //     catchError(this.handleError)
  //   )
  // }

  login(creds: LoginRequest){
    return this.http.post(environment.urlHost+"login", creds, {
      observe: 'response'
    }).pipe(map((response: HttpResponse<any>) =>{
      const body = response.body;
      const headers = response.headers;

      const bearerToken = headers.get('Authorization')!;
      const token = bearerToken.replace('Bearer', '');

      localStorage.setItem('token', token);
      return body;

    }))
  }

  getToken(){
    return localStorage.getItem('token');
  }

  logout():void{
    localStorage.removeItem("token");
    this.currentUserLoginOn.next(false);
  }

  private handleError(error:HttpErrorResponse){
    if(error.status===0){
      console.error('Se ha producido un error ', error.error);
    }
    else{
      console.error('El backend retornó el código de estado ', error.error);
    }
    return throwError(() => new Error('Algo falló. Por favor intente nuevamente'));
  }

  get userData():Observable<String>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn.asObservable();
  }
}
