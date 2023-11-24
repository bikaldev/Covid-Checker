import { Injectable, EventEmitter } from "@angular/core";
import { HttpClient } from '@angular/common/http'; 
import { Patient } from "../models/patient.model";


@Injectable()
export class PatientService {
    

    constructor(private http: HttpClient) {
        
    }

    savePatient(name: string, age: string, gender: string, address: string, email: string, org_email:string) {
        const url = "http://localhost:3000/savePatient";
        return this.http.post<{message: string}>(url, {
            name: name,
            age: age,
            gender: gender,
            address: address,
            email: email,
            org_email: org_email
        })
    }

    deletePatient(id: number) {
        const url = "http://localhost:3000/deletePatient";
        return this.http.post(url, {
            id: id
        });
    }

    getPatients(org_email: string) {
        const url = "http://localhost:3000/getPatients"
        return this.http.post<{message:string, result: Array<Patient>}>(url, {
            org_email: org_email
        });
    }

    searchPatient(keyword: string) {
        const url = "http://localhost:3000/searchPatient"
        return this.http.post<{message: string, result: Array<Patient>}>(url, {
            name: keyword
        })
    }
}