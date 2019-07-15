import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../auth/user-auth.service';


@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.css']
})
export class HistoryComponent implements OnInit {

  user: any = {};

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth: UserAuthService) {
     }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.auth.gettransactionId(params.id)
      .subscribe(user => {
        this.user = user;
        // this.user = Array.of (this.user)
        // co nsole.log('this.transaction',this.user);
  })

});

  }

}


