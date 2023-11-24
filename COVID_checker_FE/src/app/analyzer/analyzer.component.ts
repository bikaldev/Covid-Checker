import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

import { Patient } from '../models/patient.model';
import { HistoryService } from '../services/history.service';
import { BackendService } from '../services/backend.service';
import { AuthService } from '../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.css']
})
export class AnalyzerComponent implements OnInit {


  imageUploaded: boolean = false;
  isFetching: boolean = false;
  searchResult: Array<Patient> = [];
  result: boolean = false;
  imagePath: any;
  probab: string;
  diagnosis: string;
  isLoading: boolean = false;
  errorMsg: string = "Please upload suitable X-ray image as shown in the sample image to get the result";
  patientId: number;
  name:string;
  gender: string;
  age: string;
  constructor(private patientService: PatientService,private backendService: BackendService, private historyService: HistoryService, private authService: AuthService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {

    this.patientId = Number(this.route.snapshot.data['patientId']);
    this.name = this.route.snapshot.params['name'];
    this.gender = this.route.snapshot.params['gender'];
    this.age = this.route.snapshot.params['age'];
    console.log(this.name, this.gender)
    
  }

  onsubmit(){
    
    let imageData = this.imagePath;

    this.isFetching = true
    this.backendService.predict(imageData).subscribe((json) => {
      
      this.backendService.predictPy().subscribe(json => {
        if(json.probability) {
          this.probab = json.probability
        }
        this.diagnosis = json.diagnosis
        this.isFetching = false;
        this.result = true;

        if(this.authService.isLoggedIn){
          this.historyService.recordHistory(this.patientId, this.diagnosis,this.probab).subscribe(
            response => {
              console.log(response);
            }
          );
        }
      })

    });
  }


  onReset() {
    this.imageUploaded = false;
    this.imagePath = null;
    this.errorMsg = "Please upload suitable X-ray image as shown in the sample image to get the result";
    this.isFetching = false;
    this.result = false;
    this.diagnosis = '';
    this.probab = '';
  }

  onSelect(event: any) {
    if(!event.target.files[0] || event.target.files[0].length == 0) {
			this.errorMsg = 'You must select an image';
      this.imageUploaded = false;
			return;
		}
		
		var mimeType = event.target.files[0].type;
		
		if (mimeType.match(/image\/*/) == null) {
			this.errorMsg = "Only images are supported";
      this.imageUploaded = false;
			return;
		}
		
		var reader = new FileReader();
		reader.readAsDataURL(event.target.files[0]);
		
		reader.onload = (_event) => {
			this.errorMsg = "";
			this.imagePath = reader.result;
      this.imageUploaded = true;

		}
  }


}
