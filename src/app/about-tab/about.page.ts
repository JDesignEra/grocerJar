import { Component } from '@angular/core';

@Component({
  selector: 'app-aboutTab',
  templateUrl: 'about.page.html',
  styleUrls: ['about.page.scss']
})
export class AboutTabPage {
  currYear = new Date().getFullYear();
  
  constructor() {}
}
