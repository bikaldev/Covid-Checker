import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http'; 
import { AuthService } from "./auth.service";
import { History } from "../models/history.model";

@Injectable()
export class HistoryService {

    url: string;
    historyList: Array<History>

    constructor(private http: HttpClient) {
        this.url = 'http://localhost:3000/';
    }

    getHistory(patientId: string) {
        let histUrl = this.url + 'getHistory';
        return this.http.post<{message: string, history: Array<History>}>(histUrl, {
           patientId: Number(patientId)
        });
    }

    recordHistory(patientId: number, diagnosis: string,certainty?: string) {
        let histUrl = this.url + 'record';
        return this.http.post<{message: string}>(histUrl, {
            patientId: patientId,
            diagnosis: diagnosis,
            certainty: certainty
        });
    }

}