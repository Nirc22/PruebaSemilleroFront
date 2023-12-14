import { Data } from "@angular/router";

export interface Pacientes {
  nmid:number;//?: representa que es opcional
  dsnombre:string;
  nmidespecie:{
    nmidespecie:Number,
    dsnombre: string,
  };
  nmidraza:{
    nmidraza:Number,
    dsnombre: string,
  };
  fenacimiento:Date;
  nmidtipoidentificacion: {
    nmidtipoidentificacion:Number,
    dsnombre: string,
  };
  nmidentificacion: Number;
  dsduenio: string;
  dsciudad: string;
  dsdireccion: string;
  nmtelefono: Number;
  feregistro: Date;
}
