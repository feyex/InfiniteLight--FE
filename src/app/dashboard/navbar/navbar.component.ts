import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../auth/user-auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  user: any = {};
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth:  UserAuthService,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.auth.getUsersId(params['id']).then(res => {
        this.user = res;
        console.log('this.user',this.user.message.firstname);
  })

});
  }

}
