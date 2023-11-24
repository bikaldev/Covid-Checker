import { Component, OnInit } from '@angular/core';
import { PatientService } from '../services/patient.service';
import { Patient } from '../models/patient.model';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit {


  patientList: Array<Patient>;
  isLoading:boolean = false;
  
  constructor(private patientService: PatientService, private authService: AuthService) {

    let org_email = this.authService.email;
    console.log(org_email);
    this.patientService.getPatients(org_email).subscribe(
      results => {
        this.patientList = results.result;
      }
    )
   }

   onSearch(key: HTMLInputElement) {
    let searchKey = key.value;
    this.isLoading = true;
    this.patientService.searchPatient(searchKey).subscribe(
      json => {
        this.isLoading = false;
        this.patientList = json.result;
      }
    )
  }

  ngOnInit(): void {
  }

}
