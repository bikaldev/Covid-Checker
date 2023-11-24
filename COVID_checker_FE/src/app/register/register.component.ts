import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { PatientService } from '../services/patient.service';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class RegisterComponent implements OnInit {
  
  ngOnInit(): void {
    
  }

  isLoading: boolean;

  constructor(private patientService: PatientService, private authService: AuthService) {
    this.isLoading = false;
  }

  onRegister(form: NgForm) {
      this.isLoading = true;
      let org_email = this.authService.email;
      console.log("org email",org_email);
      console.log(form.value);

      this.patientService.savePatient(form.value['name'],form.value['age'],form.value['gender'],form.value['address'],form.value['email'], org_email)
      .subscribe(
        result => {
          this.isLoading = false;
          form.reset();
        }
      )
  }
}
