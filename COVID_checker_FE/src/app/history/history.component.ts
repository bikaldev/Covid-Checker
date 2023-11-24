import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { History } from '../models/history.model';
import { AuthService } from '../services/auth.service';
import { HistoryService } from '../services/history.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  historyList: History[];
  name: string;
  age: string;
  gender: string;

  constructor(private historyService: HistoryService, private router: Router, private route: ActivatedRoute) {
    this.historyService.getHistory(this.route.snapshot.data['patientId']).subscribe(
      (result) => {
        this.historyList = result.history;
        this.historyService.historyList = this.historyList;
      }
    );
    
   }

  ngOnInit(): void {
    this.name = this.route.snapshot.params['name'];
    this.age = this.route.snapshot.params['age'];
    this.gender = this.route.snapshot.params['gender'];
    
  }

  

}
