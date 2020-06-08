import { Component } from '@angular/core';
import { WeatherService } from '../shared/services/weather.service';
import { Weather } from '../shared/models/weather';

@Component({
  selector: 'app-welcome-tab',
  templateUrl: 'welcome.page.html',
  styleUrls: ['welcome.page.scss']
})
export class WelcomeTabPage {
  errorMsg: string;
  weather: Weather;

  constructor(private weatherService: WeatherService) {}

  ngOnInit() {
    this.weatherService.getWeather().subscribe(data => this.weather = data, error => this.errorMsg = JSON.stringify(error));
  }
}
