import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../auth/user-auth.service';
import { Router } from '@angular/router';
import * as Highcharts from 'highcharts';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  Highcharts: typeof Highcharts = Highcharts; // required
  chartConstructor: string = 'chart'; // optional string, defaults to 'chart'
  chartOptions: Highcharts.Options = { 
    series: [{
      type: 'column', 
      data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
      // tooltip: {
      //     valueSuffix: ' k'
      // },
      pointWidth: 10,
      borderRadius: 5,
      color: '#323366',
      legend: {
        enabled: false,
      },
    //   xAxis: [{
    //     categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    //         'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
    //     crosshair: true
    // }],

  }]
  }; // required
  // chartCallback: Highcharts.ChartCallbackFunction = function (chart) { ... } // optional function, defaults to null
  updateFlag: boolean = false; // optional boolean
  oneToOneFlag: boolean = true; // optional boolean, defaults to false
  runOutsideAngular: boolean = false; // optional boolean, defaults to false

      
  constructor(private auth: UserAuthService,
    private router: Router) { }

  ngOnInit() {
   
  }

logout(){
  this.auth.logout();
  this.router.navigate([''])
}

 //check if user is logged in
 public get loggedIn(): boolean {
  return (localStorage.getItem('access_token') !== null);
}

}
