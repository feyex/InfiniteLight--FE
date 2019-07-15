import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute,Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';
import { UserAuthService } from '../../auth/user-auth.service';


@Component({
  selector: 'app-help',
  templateUrl: './help.component.html',
  styleUrls: ['./help.component.css']
})
export class HelpComponent implements OnInit {
  user: any = {};
  id =""
  contact = {
    fullname: "",
    email: "",
    phoneNumber: "",
    message: ""
  }


  public fullname: string;
  public email: string;
  public phoneNumber: Number;
  public message: string;
  contactForm: any;

  constructor(private lf: FormBuilder,
    private route: ActivatedRoute,
    private auth: UserAuthService,
    private toastr: ToastrService,
    private router: Router) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.auth.getUsersId(params['id']).then(res => {
        this.user = res;
        console.log('this.user',this.user.message.firstname);
        this.fullname =this.user.message.firstname + this.user.message.lastname ;
        this.email = this.user.message.email;
        this.phoneNumber = this.user.message.phoneNumber;
  })

});
  }

  

  public submit() {
    
    console.log(this.fullname,this.email,this.phoneNumber,this.message);
    this.auth.contact(this.fullname,this.email,this.phoneNumber,this.contact.message)
      .pipe(first())
      .subscribe(
        (result:any) =>{
          console.log('result',result);
          if(result.status == true){
            this.toastr.success("Report Sent Successfully.", "Report", {
              timeOut: 4000,
              positionClass: 'toast-top-center'
            });
          }
          else{
            this.toastr.error("Report Failed. Please fill all required fields", "Report Error", {
              timeOut: 4000,
              positionClass: 'toast-top-center'
            });
          
          }
          
        } 
      );
  }


}
