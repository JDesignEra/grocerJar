import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { Weather } from '../models/weather';

@Injectable({
  providedIn: 'root'
})
export class WeatherService {

  constructor(private http: HttpClient) {}

  getWeather() {
    return this.http.get('http://dataservice.accuweather.com/currentconditions/v1/300597?apikey=nKfuTA6IWpYjFarfaEKhWms2yArOwbpq')
      .pipe(
        map(response => {
          let res = response[0];

          
          return new Weather(res['LocalObservationDateTime'], res['WeatherText'], `assets/weather-icons/${res['WeatherIcon']}.svg`, res['Temperature']['Metric']['Value']);
        })
      );
  }
}
