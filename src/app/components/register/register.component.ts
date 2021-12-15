import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormControlName, FormGroup ,Validators} from '@angular/forms';
import {HttpClient} from '@angular/common/http';
import { Router } from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import { User } from 'src/app/modules/admin/components/userdetails/users';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
signupForm!:FormGroup;
arrUsers:User[]=[];
userid:number=0;
userid1!:number;
userObj:User=new User;
userfound:boolean=false;
  userData !: any;
  constructor(private restService:RestService,private _snackBar:MatSnackBar,private formBuilder:FormBuilder,private httpClient:HttpClient,private router:Router) { }
  submitted:boolean=false;
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      name:['',[Validators.required,Validators.pattern('^[A-Za-z\s]{1,}[\.]{0,1}[A-Za-z\s]{0,}$')]],
      phoneno:['',[Validators.required,Validators.pattern('[0-9]{10}')]],
      loc:['',Validators.required],
      email:['',[Validators.required,Validators.email]],
      password:['',Validators.required],
    });
    this.httpClient.get<any>("http://localhost:8000/user/getAll").subscribe(res=>{
      this.arrUsers=res;
      console.log(this.arrUsers);
  })
  }

  get f(){
    return this.signupForm.controls;
  }
  SignUp()
  {
    this.submitted = true;
    if (this.signupForm.valid) {
      console.log(this.arrUsers);
      this.userid=this.arrUsers.length;
      
      this.userid1=this.userid+1;
      console.log(this.userid1);
      this.userObj.id=this.userid1;
      this.userObj.name = this.signupForm.value.name;
      this.userObj.phoneno = this.signupForm.value.phoneno;
      this.userObj.loc = this.signupForm.value.loc;
      this.userObj.email = this.signupForm.value.email;
      this.userObj.password = this.signupForm.value.password;

      console.log(this.userObj);

      for(let i=0;i<this.arrUsers.length;i++){
        if(this.signupForm.value.email==this.arrUsers[i].email)
        {
          this.userfound=true;

        break;
        }
      }
      if(this.userfound==false){
        this.restService.postUser(this.userObj).subscribe(res=>{
          this._snackBar.open("Registration Successfull!!","Close", {
            duration:2000,
            verticalPosition: 'top',
            horizontalPosition: 'center'
        });
        this.router.navigate(['login2'])
        //sessionStorage.setItem('loggedUserName', this.signupForm.value.name);
        },
      err=>{
        alert("Something went wrong");
      }
      )
      }
      else{
        this._snackBar.open("User's already existing, Please Login!!","Close", {
          duration:2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
      });
      this.router.navigate(['login2'])
        
      }

    }
  }
}