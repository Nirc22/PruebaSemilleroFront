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

  crearPersona(persona:Personas){
    return this.http.post<Personas>(environment.urlApi+"persona/crear", persona)
  }

  getPersonaId(id:number){
    return this.http.get<Personas>(environment.urlApi+"getPersonaId/"+id)
  }

  updatePersona(persona:Personas){
    return this.http.put<Personas>(environment.urlApi+"persona/update/"+persona.nmidpersona, persona)
  }
}
