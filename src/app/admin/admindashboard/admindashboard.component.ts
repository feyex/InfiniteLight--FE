import { Component, NgZone, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../auth/admin-auth.service';
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

am4core.useTheme(am4themes_animated);


@Component({
  selector: 'app-admindashboard',
  templateUrl: './admindashboard.component.html',
  styleUrls: ['./admindashboard.component.css']
})
export class AdmindashboardComponent implements OnInit {
  private chart: am4charts.XYSeries;
  chart1: any;
  ctx: any;
  chart2: any;
  gradientStroke: any;
  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AdminAuthService,
    private zone: NgZone, 
    ) {

  }

  ngOnInit() {

    let chart = am4core.create("chartdiv", am4charts.PieSeries);

    chart.data = [{
      "country": "Failed Token",
      "number": 165  
    }, {
      "country": "Resolved Issues",
      "number": 139
    }];



    // let pieSeries = chart.series.push(new am4charts.PieSeries());

    // pieSeries.dataFields.value = "number";
    // pieSeries.dataFields.category = "country";
    // pieSeries.slices.template.stroke = am4core.color("#fff");
    // pieSeries.slices.template.strokeWidth = 2;
    // pieSeries.slices.template.strokeOpacity = 1;

    // // This creates initial animation
    // pieSeries.hiddenState.properties.opacity = 1;
    // pieSeries.hiddenState.properties.endAngle = -90;
    // pieSeries.hiddenState.properties.startAngle = -90;
    // pieSeries.labels.template.disabled = true;
    // pieSeries.colors.list = [
    //   am4core.color("#f58053"),
    //   am4core.color("#3d4094"),
    // ];

    // let series = chart.series.push(new am4charts.PieSeries());
    // chart.paddingRight = 20;

    // let data = [];
    // let visits = 10;
    // for (let i = 1; i < 366; i++) {
    //   visits += Math.round((Math.random() < 0.5 ? 1 : -1) * Math.random() * 10);
    //   data.push({ date: new Date(2018, 0, i), name: "name" + i, value: visits });
    // }

    // chart.data = data;

    // let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
    // dateAxis.renderer.grid.template.location = 0;

    // let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
    // valueAxis.tooltip.disabled = true;
    // valueAxis.renderer.minWidth = 35;

    // let series = chart.series.push(new am4charts.LineSeries());
    // series.dataFields.dateX = "date";
    // series.dataFields.valueY = "value";

    // series.tooltipText = "{valueY.value}";
    // chart.cursor = new am4charts.XYCursor();

    // let scrollbarX = new am4charts.XYChartScrollbar();
    // scrollbarX.series.push(series);
    // chart.scrollbarX = scrollbarX;

    // this.chart = chart;




    this.chart1 = document.getElementById('myChart');
    this.ctx = this.chart1.getContext('2d');
    this.gradientStroke = this.ctx.createLinearGradient(0, 0, 0, 600);
    this.gradientStroke.addColorStop(0, "#f26b36");
    this.gradientStroke.addColorStop(0.2, "rgba(244, 124, 78, 0.88)");
    this.gradientStroke.addColorStop(1, "rgba(255, 255, 255, 0)");



    this.chart2 = new Chart(this.ctx, {
      // The type of chart we want to create
      type: 'line',

      // The data for our dataset
      data: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
        datasets: [{
          label: 'Revenue',
          backgroundColor: this.gradientStroke,
          borderColor: '#3d4094',
          data: [0, 10, 5, 2, 10, 20, 15, 10, 10, 25, 30, 45]
        }]
      },

      // Configuration options go here
      options: {
        legend: {
          display: false,

        }
      }
      // this.chart2 = chart2;
    });

    //get all orders in the system
    this.auth.getOrders()
      .then(user => {
        this.user = user;
        this.user = Array.of(this.user);
        this.user = this.user[0];
        console.log('this.contact', this.user);


      });

  }

  ngOnDestroy() {
    this.zone.runOutsideAngular(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }


}
