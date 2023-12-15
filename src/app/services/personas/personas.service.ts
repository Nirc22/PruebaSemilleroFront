import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Personas } from 'src/app/interfaces/personas';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonasService {

  constructor(private http:HttpClient) { }

  getPersonas(persona:String):Observable<Personas>{
    return this.http.get<Personas>(environment.urlApi+"getPersonas")
  }
}
