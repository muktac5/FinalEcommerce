import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormControlName, FormGroup ,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OtpService } from 'src/app/services/otp.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-resetpassword',
  templateUrl: './resetpassword.component.html',
  styleUrls: ['./resetpassword.component.scss']
})
export class ResetpasswordComponent implements OnInit {
  faLock = faLock;
  constructor(private router:Router,private otp:OtpService,private _snackBar:MatSnackBar,private httpClient:HttpClient,private formBuilder:FormBuilder) { }
  signupForm!:FormGroup;
  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
      otp:[''],
      password:['']
    });
  }
  get f(){
    return this.signupForm.controls;
  }
SignUp(){
  if(this.signupForm.valid){
  this.otp.resetPassword(this.signupForm.value).subscribe((res:any)=>{
    this._snackBar.open("Your password has been successfully updated!!Go ahead and login!","Close", {
      duration:2000,
      verticalPosition: 'top',
      horizontalPosition: 'center'
  });
    this.router.navigate(['login2']);
  })
}
else{
  return ;
}
}
}
