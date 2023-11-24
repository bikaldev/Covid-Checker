import { Component, Input, OnInit } from '@angular/core';
import { History } from 'src/app/models/history.model';

@Component({
  selector: 'app-history-card',
  templateUrl: './history-card.component.html',
  styleUrls: ['./history-card.component.css']
})
export class HistoryCardComponent implements OnInit {

    @Input('history') history: History;

  constructor() { 
  }

  ngOnInit(): void {
  }

}
