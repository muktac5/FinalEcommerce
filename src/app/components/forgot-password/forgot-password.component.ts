import { Component, OnInit } from '@angular/core';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { FormBuilder, FormControl, FormControlName, FormGroup ,Validators} from '@angular/forms';
import {MatSnackBar} from '@angular/material/snack-bar';
import { OtpService } from 'src/app/services/otp.service';
import { any } from 'sequelize/dist/lib/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  faLock = faLock;
  arrUsers:any=[];
  signupForm!:FormGroup;
  disabled1:boolean=false;
  constructor(private router:Router,private otp:OtpService,private _snackBar:MatSnackBar,private httpClient:HttpClient,private formBuilder:FormBuilder) { }

  ngOnInit(): void {
    this.signupForm=this.formBuilder.group({
      email:['',[Validators.required,Validators.email]],
    });
  }
  get f(){
    return this.signupForm.controls;
  }
  SignUp(){
    if(this.signupForm.valid)
    {
      this.otp.sendOtp(this.signupForm.value).subscribe((res:any)=>{
        console.log(res);
        this.router.navigate(['forgot-password/verify']);
        this._snackBar.open("OTP has been sent!Check your spam folders for the email","Close", {
          duration:2000,
          verticalPosition: 'top',
          horizontalPosition: 'center'
      });

      }),(err:HttpErrorResponse)=>{
        this.disabled1=true;

        if(err.status===400)
        {
          console.log(err.error.message);
        }
      }

    }

  }

}
