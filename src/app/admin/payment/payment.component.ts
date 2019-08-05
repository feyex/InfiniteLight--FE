import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../auth/admin-auth.service';


@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.css']
})
export class PaymentComponent implements OnInit {

  searchText:any;
  chart: any;
  ctx: any;
  chart2: any;
  gradientStroke: any;
  user: any = {};
  collection: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AdminAuthService,) {
      
     }

  ngOnInit() {
    this.chart = document.getElementById('myChart');
    this.ctx = this.chart.getContext('2d');
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
    });


    //get all payments in system 
    this.auth.getPayments()
      .then(user => {
        this.user = user;
        this.user = Array.of (this.user);
        this.user = this.user[0];
        this.collection = this.user.length;
        console.log('this.contact',this.user);


});

  }

 //Pagination functionalities
 config = {
  itemsPerPage: 10,
  currentPage: 1,
  totalitems: this.collection
};

public maxSize: number = 20;
public directionLinks: boolean = true;
public autoHide: boolean = false;
public responsive: boolean = true;
public labels: any = {
    previousLabel: '<',
    nextLabel: '>',
    screenReaderPaginationLabel: 'Pagination',
    screenReaderPageLabel: 'page',
    screenReaderCurrentLabel: `You're on page`
};

onPageChange(event){
  console.log(event);
  this.config.currentPage = event;
}

}





