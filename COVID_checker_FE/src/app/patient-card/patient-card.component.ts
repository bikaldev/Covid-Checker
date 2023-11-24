import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '../models/patient.model';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-patient-card',
  templateUrl: './patient-card.component.html',
  styleUrls: ['./patient-card.component.css']
})
export class PatientCardComponent implements OnInit {

  @Input('patient') patient: Patient;
  
  constructor(private patientService: PatientService, private router: Router) { }

  ngOnInit(): void {
  }

  onDelete() {
    this.patientService.deletePatient(this.patient.id).subscribe(
      json => {
        console.log('Deleted!')
      }
    )
  }

  onViewHistory() {
    console.log('view history')
    this.router.navigate(['history',this.patient.id.toString(), this.patient.name, this.patient.age, this.patient.gender]);
  }

  onAnalyze() {
    this.router.navigate(['analyze', this.patient.id.toString(), this.patient.name, this.patient.age, this.patient.gender]);
  }

}
