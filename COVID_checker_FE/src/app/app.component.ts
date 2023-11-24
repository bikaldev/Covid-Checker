import { Component, ViewEncapsulation } from '@angular/core';
import { AuthService } from './services/auth.service';
import { BackendService } from './services/backend.service';
import { HistoryService } from './services/history.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {

  constructor(private authService: AuthService, private backendService: BackendService, private historyService: HistoryService) {}
  username = '';
  onclick(usernameinput: { value: any; }){
    let name1 = usernameinput.value
    console.log(name1)
  }
  title = 'COVID_checker_FE';
}
