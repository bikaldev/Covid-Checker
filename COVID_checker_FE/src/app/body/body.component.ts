import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Patient } from '../models/patient.model';
import { AuthService } from '../services/auth.service';
import { BackendService } from '../services/backend.service';
import { HistoryService } from '../services/history.service';
import { PatientService } from '../services/patient.service';

@Component({
  selector: 'app-body',
  templateUrl: './body.component.html',
  styleUrls: ['./body.component.css'],
  encapsulation: ViewEncapsulation.Emulated
})
export class BodyComponent implements OnInit {
  
  imageUploaded: boolean = false;
  isFetching: boolean = false;
  searchResult: Array<Patient> = [];
  result: boolean = false;
  imagePath: any;
  probab: string;
  diagnosis: string;
  isLoading: boolean = false;
  errorMsg: string = "Please upload suitable X-ray image as shown in the sample image to get the result";
  constructor(private backendService: BackendService, private historyService: HistoryService, private authService: AuthService) { }

  ngOnInit(): void {
  }
  onsubmit(bform: NgForm){
    let name = bform.value['name'];
    let gender = bform.value['gender'];
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
          console.log(this.authService.email, this.authService.name)
          this.historyService.recordHistory(1, this.diagnosis,this.probab).subscribe(
            response => {
              console.log(response);
            }
          );
        }
      })

    });

    

  }

  

  onReset(bform: NgForm) {
    bform.reset();
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
