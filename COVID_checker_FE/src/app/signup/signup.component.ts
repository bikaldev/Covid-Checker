import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signed_up: boolean = false;
  pass_match: boolean= true;
  err_msg : string='' ;
  isAuthenticating: boolean = false;
  hasError: boolean = false;
  // too_short : string = "Password too short. Password must be atleast 8 characters";
  // pass_short:boolean  = false;

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  onsignup(signup_form: NgForm)
  {
    this.hasError = false;
    let name = signup_form.value['name'];
    let email = signup_form.value['email'];
    let password = signup_form.value['password']
    let repeat_password = signup_form.value['repeat_password']
    let address = signup_form.value['address'];
    if (password != repeat_password)
    {

      this.hasError = true;
      this.err_msg = "The passwords do not match. Please try again.";
    } else {
      this.isAuthenticating = true;
      this.authService.signUp(name, email, password, address).subscribe(
        response => {
          if(!response.isAuth) {
            this.hasError = true;
            this.err_msg = response.message;
            this.isAuthenticating = false;
          } else {
            this.hasError = false;
            this.isAuthenticating = false;
            console.log(response.message);
            this.authService.setInfo(name, email);
            this.authService.setLogIn();
            this.router.navigate(['/home']);
            
          }
        },
        error => {
          this.err_msg = error.error.message;
          this.hasError = true;
          this.isAuthenticating = false;
        }
      )
    }
    
  }
  onclick(){

  }

}
