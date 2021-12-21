import { AuthService } from 'src/app/services/auth.service'
import { Router } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(private auth: AuthService,private rest:RestService) {}
  loggedInEmail=sessionStorage.getItem('loggedUser');
  public users: any = [];
  public fullName:any;
  ngOnInit() {
    this.rest.getUser().subscribe((res:any)=>{
      this.users.push(res);
      this.users.forEach((a: any) => {
        console.log(a.length);
        for(let i=0;i<a.length;i++)
        {
          if(a[i].email==this.loggedInEmail)
          {
            this.fullName=a[i].name;
          }
        }
      })
    });
  }
  logout(): void {
    this.auth.logout();
  }

}