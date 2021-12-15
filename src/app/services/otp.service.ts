import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class OtpService {

  constructor(private httpClient:HttpClient) { }
  baseUrl="http://localhost:8000/";
  sendmail="http://localhost:8000/reset/sendmail";
  verify="http://localhost:8000/reset/verify"
  sendOtp(email: string): Observable<any>{
    return this.httpClient.post<any>(this.sendmail, email);
  }
  resetPassword(otp: any): Observable<any> {
    return this.httpClient.post<any>(this.verify, otp);
  }


}
