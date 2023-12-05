import { Data } from "@angular/router";

export interface Pacientes {
  nmid?:number;//?: representa que es opcional
  dsnombre:string;
  nmidespecie:number;
  nmidraza:number;
  fenacimiento:Date;
  nmidtipoidentificacion: number;
  nmidentificacion: number;
  dsduenio: string;
  dsciudad: string;
  dsdireccion: string;
  nmtelefono: number;
  feregistro: Date;
}
