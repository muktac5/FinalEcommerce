import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { Store } from '../electronics/store';
import { NgbRatingConfig } from '@ng-bootstrap/ng-bootstrap';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Location } from '@angular/common';
import { RestService } from 'src/app/services/rest.service';
import { User } from '../userdetails/users';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [NgbRatingConfig],
  styles: [
    `
    .star {
      margin:3px;
      font-size: 1.5rem;
      color: #b0c4de;
    }
    .filled {
      color: #1e90ff;
    }
    `
  ]
})
export class ProductsComponent implements OnInit {

  public usersList:any;
  userObj:User=new User;
  public itemsList:any;
  public totalItem:number=0;
  cartitem:any=[];
  public productList:any=[];
  loggedInEmail=sessionStorage.getItem('loggedUser');
  constructor(private rest:RestService,private location: Location,private _snackbar: MatSnackBar,private cartService:CartService,private api:ApiService,config: NgbRatingConfig,private activatedRoute: ActivatedRoute) {
    config.max = 5;
    config.readonly = true;
   }

  idForProductsRouting:number=0;
  ngOnInit(){

      this.rest.getUser().subscribe(
        (res:any)=>{
          this.usersList=res;
          for(let i=0;i<this.usersList.length;i++)
          {
            if(this.usersList[i].email==this.loggedInEmail)
            {
              this.totalItem=this.usersList[i].cart.length;
              this.itemsList=this.usersList[i].cart;
            }
          }
          
        }
      );
    
    this.activatedRoute.paramMap.subscribe((param)=>{
      this.idForProductsRouting=Number(param.get('id'));
      if(this.idForProductsRouting!=0){
        console.log(this.idForProductsRouting);
        this.getAllProducts(this.idForProductsRouting);
      }
    });
    
  console.log(this.productList);
  }
  getAllProducts(id:number){
    this.api.getProductById(id).subscribe((res: any) => {
      this.productList.push(res);
      console.log(this.productList);
      this.productList.forEach((a: any) => {
        Object.assign(a, { quantity: 1,total:a.price });
      });
    });
  }
  addtocart(item: any) {
    for(let i=0;i<this.usersList.length;i++){
      if(this.usersList[i].email==this.loggedInEmail)
      {
        for(let j=0;j<this.productList.length;j++){
        this.userObj.id=this.usersList[i].id;
        this.userObj.name=this.usersList[i].name;
        this.userObj.email=this.usersList[i].email;
        this.userObj.loc=this.usersList[i].loc;
        this.userObj.phoneno=this.usersList[i].phoneno;
        this.userObj.password=this.usersList[i].password;
        if(item.id==this.productList[j].id){
          console.log(this.productList[j].quantity);
          console.log(this.productList[i].price);
          this.productList[j].total=this.productList[j].price*this.productList[j].quantity;
          this.cartitem=`${item.id}@1@${this.productList[j].price*this.productList[j].quantity}`;
          console.log(this.cartitem);
          this.itemsList.push(this.cartitem);
          this.userObj.cart=this.itemsList;
          console.log(this.userObj);
          this.cartService.addtoCart(this.cartitem);
        }
      }
    }
    this.rest.updateUser(this.userObj).subscribe(res=>{
    });
    this.totalItem++;
    if (item.aquant === item.quantity) {
      this._snackbar.open("The item is out of stock now, please come back later..", "Close", {
        duration:2000,
        verticalPosition: 'top',
        horizontalPosition: 'center'
      });
    }
    this.cartService.addtoCart(item.id);
  }
}
  goBack(): void {
    this.location.back();
  }

}
