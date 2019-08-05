import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../auth/admin-auth.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  searchText:any;
  user: any = {};
  collection: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AdminAuthService,) {
      
     }

  ngOnInit() {
      this.auth.getOrders()
      .then(user => {
        this.user = user;
        this.user = Array.of (this.user);
        this.user = this.user[0];
        this.collection = this.user.length;


});
 
  }

  deleteorder(id){
    this.auth.deleteOrder(id)
    .then (user => {
      this.user = user;
    })
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




