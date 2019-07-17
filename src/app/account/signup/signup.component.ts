import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { User } from '../../auth/user';
import { UserAuthService } from '../../auth/user-auth.service';
import { ToastrService } from 'ngx-toastr';
import * as $ from 'jquery';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signup = {
    email : "", 
    firstname : "",
    lastname : "", 
    phoneNumber: "",
    password: ""

  }

  referralNum = Math.floor(Math.random() * 10000000000) + 999;

  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private authService: UserAuthService,
              private toast:ToastrService) {
  }

  ngOnInit() {
  //   function toggle(button) {
  //     var password = document.getElementById("password");
  //     if (password.type == "password") {
  //         button.innerHTML = "<i class='ion-eye-disabled' style='font-size: 20px; color: #ddd;'></i>";
  //         password.type = "text";
  //     }
  //     else {
  //         button.innerHTML = "<i class='ion-eye' style='font-size: 20px; color: #ddd;' ></i>";
  //         password.type = "password";
  //     }
  // }
  }

  create() {
    const email = this.signup.email;
    const firstname = this.signup.firstname;
    const lastname = this.signup.lastname;
    const phoneNumber = this.signup.phoneNumber;
    const password= this.signup.password;
    const referral = this.referralNum;
    
    console.log('mmm', email,firstname,phoneNumber,password,lastname,referral)
    this.authService.signin( email,firstname,lastname,phoneNumber,password,referral).subscribe((res:any) => {
    
      if(res.status == true){
        this.toast.success("User Registered Successfully.", "Signup", {
          timeOut: 4000,
          positionClass: 'toast-top-center'
        });
        this.router.navigate(['/login']);
      }
      else{
        this.toast.error("Registration Failed.", "Signup Error", {
          timeOut: 4000,
          positionClass: 'toast-top-center'
        });
      
      }
     
    }
    
    );
  }

}


