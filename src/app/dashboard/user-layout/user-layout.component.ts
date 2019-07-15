import { Component, OnInit } from '@angular/core';
import { UserAuthService } from '../../auth/user-auth.service';
import { ActivatedRoute,Router } from '@angular/router';

@Component({
  selector: 'app-user-layout',
  templateUrl: './user-layout.component.html',
  styleUrls: ['./user-layout.component.css']
})
export class UserLayoutComponent implements OnInit {
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
  logout() {
    this.auth.logout();
    this.router.navigate(['']);
  }


}
