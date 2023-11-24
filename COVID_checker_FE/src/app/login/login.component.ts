import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
 err_msg :string =''
 isAuthenticating: boolean = false;
 hasError: boolean = false;
 
  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onlogin(form: NgForm){
    this.hasError = false;
    let email = form.value['email'];
    let password = form.value['password'];
    this.isAuthenticating = true;
    this.authService.logIn(email, password).subscribe((response) => {
      if(!response.token) {
        this.hasError = true;
        this.err_msg = response.message;
        this.isAuthenticating = false;
      } else {
        this.hasError = false;
        this.authService.setToken(response.token);
        this.authService.setInfo(response.name, response.email);
        this.isAuthenticating = false;
        this.authService.setLogIn();
        this.router.navigate(['/home']);
      }
    }, 
    (error) => {
      this.hasError = true;
      this.err_msg = error.error.message;
      if(!this.err_msg){
        this.err_msg = "Server Error";
      }
      this.isAuthenticating = false;
    })
  }

}
