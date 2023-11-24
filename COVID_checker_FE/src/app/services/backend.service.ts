import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 

@Injectable()
export class BackendService {

    url: string;

    constructor(private http: HttpClient) {
        this.url = 'http://localhost:3000/';
    }

    predict(imageData:any) {
        let formData = new FormData();
        formData.append('imageData', imageData);

        
        // console.log(formData)
        let predUrl = this.url + 'predict/';

        return this.http.post(predUrl, formData);
    }

    predictPy() {
        return this.http.get<{diagnosis: string, probability?: string}>("http://localhost:8001/analyze");
    }

}