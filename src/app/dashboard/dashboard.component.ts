import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginService } from '../services/auth/login.service';
import { Pacientes } from '../interfaces/pacientes';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn:boolean=false;
  userData?:Pacientes;

  constructor(private loginService:LoginService){}
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

    this.loginService.currentUserData.subscribe({
      next:(userData) => {
        this.userData=userData;
      }
    })



  }

}
