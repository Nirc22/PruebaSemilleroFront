import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { PacientesService } from '../services/pacientes/pacientes.service'
import { Administrador } from '../interfaces/administrador';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn:boolean=false;
  userData?:Administrador;


  constructor(private loginService:LoginService, private pacientesService: PacientesService, private router: Router){}
  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
  }

  ngOnInit(): void {
    this.loginService.currentUserLoginOn.subscribe({
      next:(userLoginOn) => {
        this.userLoginOn=userLoginOn;
      }
    });



//    this.loginService.currentUserData.subscribe({
//      next:(userData) => {
//        this.userData=userData;
//      }
//    })
  }

  logout():void{
    this.loginService.logout();
    this.router.navigate(['login']);


  }

  exportPacientes(){
    this.pacientesService.exportPacientes()
      .subscribe(response=>{

        let fileName = "pacientes.xls";//response.headers.get('Content-Disposition')?.split(';')[1].split('=')[1];
        let blob:Blob=response.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();

      })
  }

  crearPersona(){
    this.router.navigate(['crearPersona']);
  }

  crearPaciente(){
    this.router.navigate(['crearPaciente']);
  }




}
