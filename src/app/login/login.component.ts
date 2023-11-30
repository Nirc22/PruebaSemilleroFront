import { Component, OnInit } from '@angular/core';
import { FormBuilder, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../services/auth/login.service';
import { LoginRequest } from '../interfaces/login-requets';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{
  loginError:string="";
  loginForm: LoginRequest = {
    email:'',
    password:''
  };
  /*loginForm = this.formBuider.group({
    email:['', [Validators.required, Validators.email]],
    password:['', Validators.required],
  })*/
  constructor(private formBuider:FormBuilder, private router:Router, private loginService: LoginService) {//inyectamos

  }
  ngOnInit(): void {

  }
/*
  get email(){
    return this.loginForm.controls.email;
  }

  get password(){
    return this.loginForm.controls.password;
  }
*/
  logg(form:NgForm){
    console.log('form value', form.value);

    this.loginService.logg(this.loginForm)
      .subscribe(response => {
        this.router.navigateByUrl('/dashboard');
    })

  }
/* Ejemplo de Ivana
  login(){
    if(this.loginForm.valid){
      this.loginService.login(this.loginForm.value as LoginRequest).subscribe({
        next:(userData) => {
          console.log(userData);
        },
        error:(errorData) => {
          console.log(errorData);
          this.loginError=errorData;
        },
        complete:() => {
          console.log("Login completo");
          this.router.navigateByUrl('/dashboard');
          this.loginForm.reset();
        }
      });

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error")
    }
  }*/

}
