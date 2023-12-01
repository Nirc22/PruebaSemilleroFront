import { Data } from "@angular/router";

export interface Pacientes {
  nmid:number;
  dsnombre?:string;//?: representa que es opcional
  nmidespecie?:number;
  nmidraza?:number;
  fenacimiento?:Date;
  nmidtipoidentificacion: number;
  nmidentificacion: number;
  dsduenio: string;
  dsciudad: string;
  dsdireccion: string;
  nmtelefono: number;
  feregistro: Data;
}
