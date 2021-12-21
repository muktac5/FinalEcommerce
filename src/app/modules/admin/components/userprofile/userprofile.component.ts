import { Component, OnInit } from '@angular/core';
import { RestService } from 'src/app/services/rest.service';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-userprofile',
  templateUrl: './userprofile.component.html',
  styleUrls: ['./userprofile.component.scss']
})
export class UserprofileComponent implements OnInit {

  constructor(private api:ApiService,private rest:RestService) { }

  loggedInEmail = sessionStorage.getItem('loggedUser');
  showcart:boolean=true;
  public users: any = [];
  public loc:any;
  public fullName:any;
  public phoneNo:any;
  public itemid: number = 0;
  public itemquantity: number = 0;
  public itemtotal: number = 0;
  public cartitems: any = [];
  public category:any=[];
  ngOnInit(): void {

    if(this.loggedInEmail=="admin@gmail.com"){
      this.showcart=false;
      console.log(this.showcart);
    }
    this.rest.getUser().subscribe((res:any)=>{
      this.users.push(res);
      this.users.forEach((a: any) => {
        console.log(a.length);
        for(let i=0;i<a.length;i++)
        {
          if(a[i].email==this.loggedInEmail)
          {
            this.loc=a[i].loc;
            this.fullName=a[i].name;
            this.phoneNo=a[i].phoneno;
            for(let j=0;j<a[i].cart.length;j++)
            {
              this.itemid = parseInt(a[i].cart[j].substr(0, a[i].cart[j].indexOf('@')));
              this.itemquantity = parseInt(a[i].cart[j].substr(this.itemid.toString.length + 1, a[i].cart[j].indexOf('@')));
              let l = (this.itemquantity.toString).length + 1 + (this.itemid.toString).length + 1;
              this.itemtotal = parseInt(a[i].cart[j].substr(l, (a[i].cart[j].length) - l));
              this.api.getProductById(this.itemid).subscribe((res: any) => {
                this.cartitems.push(res);
              });
            }
          }
        }
      });
    });



  }
}
