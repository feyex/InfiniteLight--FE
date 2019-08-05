import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthService } from '../../auth/user-auth.service';
import { BillService } from './../../transactions/bill.service';

@Component({
  selector: 'app-user-bill',
  templateUrl: './user-bill.component.html',
  styleUrls: ['./user-bill.component.css']
})
export class UserBillComponent implements OnInit {
  user: any;
  refNum = Math.floor(1000 + Math.random() * 10000000000);
  
  billformGroup: FormGroup;
  // bill = new FormControl(Validators.required);
  
  constructor(
      private bfb: FormBuilder,
      private route: ActivatedRoute,
      private router: Router,
      private auth: UserAuthService,
      private billService: BillService
    ) { }
  
  ngOnInit() {
  
      this.route.params.subscribe(params => {
        this.auth.gettransaction(params['id'])
          .subscribe(res => {
            this.user = res;
            console.log('users', this.user);
          });
      });
  
  
      this.billformGroup = this.bfb.group({
        bill: ['', Validators.required],
        state: ['', Validators.required],
        disco: ['', Validators.required],
        meter: ['', Validators.required],
        amount: ['', Validators.required],
        email: ['', Validators.required],
        ref: this.refNum
      });
    }
  
    paymentDone($event) {
      const bill = this.billformGroup.value.bill;
      const state = this.billformGroup.value.state;
      const disco = this.billformGroup.value.disco;
      const meter = this.billformGroup.value.meter;
      const amount = this.billformGroup.value.amount;
      const email = this.billformGroup.value.email;
      const ref = this.refNum;
      const user_id = null;

      console.log('Hey, its me Paystack payment button');
      this.billService.processPayment(bill, state, disco, meter, amount, email, ref, user_id)
      .subscribe((res: any) => {
        if (res.status === true) {
          console.log('Bill data saved to DB', res);
          this.router.navigate(['user-receipt']);
        } else { console.error(); }
      });
    }
  
    paymentCancel() {}
  

}
