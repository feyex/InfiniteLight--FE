import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AdminAuthService } from '../../auth/admin-auth.service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent implements OnInit {

  searchText:any;
  user: any = {};
  collection: any;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: AdminAuthService,) {
      
     }

  ngOnInit() {
      this.auth.getContacts()
      .then(user => {
        this.user = user;
        this.user = Array.of (this.user);
        this.user = this.user[0].message;
        this.collection = this.user.length;

    });
 
  }

  deleteSupport(id){
    this.auth.deleteContact(id)
    .subscribe (user => {
      this.user= user;
      alert('message deleted');
    })
    window.location.reload();
  }

//Pagination functionalities
config = {
  itemsPerPage: 7,
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






