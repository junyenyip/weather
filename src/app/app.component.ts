import { Component } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { interval } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'weather';

  weather: any;

  resetTimer = 600000;

  interval: any;

  currentTime: any;

  constructor(private http: HttpClient) {
    this.interval = setInterval(() => {
      this.resetTimer -= 1000;
      if (this.resetTimer === 0) {
        this.resetTimer + 600000;
      }
    }, 1000)

    this.getCurrentTime();
  }

  ngOnInit(): void {
    this.getWeather();
    interval(this.resetTimer).subscribe(() => {
      this.getWeather();
      console.log("10 mins passed")
    })
  }

  getCurrentTime() {
    this.currentTime = Date.now();
  }

  getWeather() {
    this.resetTimer = 600000;
    this.getCurrentTime();
    this.http.get('https://api.openweathermap.org/data/2.5/weather?lat=5.3833&lon=100.3833&appid=0b14fe91eb0548e67cc8956d170f24cc').subscribe((data) => {
      this.weather = data;
      // console.log(this.weather);
      if (this.weather.main.temp - 273.15 <= 0) {
        document.body.style.background = "#9dc1e7";
      } else if (this.weather.main.temp - 273.15 <= 20) {
        document.body.style.background = "#fcc100";
      } else if (this.weather.main.temp - 273.15 <= 25) {
        document.body.style.background = "#f4d80b";
      } else if (this.weather.main.temp - 273.15 <= 30) {
        document.body.style.background = "#f1c554";
      } else if (this.weather.main.temp - 273.15 <= 35) {
        document.body.style.background = "#f18570";
      } else {
        document.body.style.background = "#de4542";
      }
    });
  }
}
