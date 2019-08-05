import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AdminAuthService } from '../../auth/admin-auth.service';
import {NgForm} from '@angular/forms';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-user-management',
  templateUrl: './user-management.component.html',
  styleUrls: ['./user-management.component.css']
})
export class UserManagementComponent implements OnInit {

  searchText:any;
  user = {
    firstname: "",
    lastname: "",
    email: "",
    staffid: "",
    role:"",
    dept:"",
    newpassword:"",
    confirmpassword:""
  }

    firstname:string;
    lastname:string;
    email:string;
    staffid:string;
    role:string;
    newpassword:string;
    confirmpassword:string;
    match: string;
    userform = false;
    result: any;
  collection: any;


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private auth:  AdminAuthService,
    private toastr: ToastrService
  ) { }

  ngOnInit() {
    this.auth.getRole()
      .then((res:any)=>{
        this.result = res;
        this.collection = this.result.length;
      })
  }

  cancel(){
    this.user.firstname = "";
    this.user.lastname = "";
    this.user.email = "";
    this.user.staffid = "";
    this.user.role = "";
    this.user.newpassword = "";
    this.user.confirmpassword = "";
  }

  public onChange(){
 
    const newpassword = this.user.newpassword;
    const confirmpassword = this.user.confirmpassword;

    if (newpassword!=''&& newpassword == confirmpassword){
      this.match = "Password match ";
        this.userform = true;
      
    }
    else{
      this.match = "Password does not match ";
      this.userform = false;
    }
  }

  signup() {
    const email = this.user.email;
    const firstname = this.user.firstname;
    const lastname = this.user.lastname;
    const staffid = this.user.staffid;
    const newpassword= this.user.newpassword;
    const role= this.user.role;
    
    console.log('user', email,firstname,staffid,newpassword,lastname,role)
    this.auth.signin( email,firstname,lastname,newpassword,role).subscribe((res:any) => {
      console.log(res);
      if(res.status == true){
        this.toastr.success("User Registered Successfully.", "Signup", {
          timeOut: 4000,
          positionClass: 'toast-top-center'
        });
        window.location.reload();
      }
      else{
        this.toastr.error("Registration Failed.", "Signup Error", {
          timeOut: 4000,
          positionClass: 'toast-top-center'
        });
      
      }
     
    }
    
    );
  }

roles = [
  {role:'admin', name:'admin'},
  {role:'disco', name:'disco'},
  {role:'maximpact', name:'maximpact'}
]

onselect(){
  console.log(this.user.role)
}
  

deleteorder(id){
  this.auth.deleteOrder(id)
  .then (user => {
    this.result = user;
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