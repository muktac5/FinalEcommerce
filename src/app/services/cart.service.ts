import { Injectable, ɵɵpureFunction1 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../modules/admin/components/userdetails/users';
import { ApiService } from './api.service';
import { RestService } from './rest.service';
@Injectable({
  providedIn: 'root'
})
export class CartService {

  userObj:User=new User;
  public cartItemList : any =[];
  public usersList:any=[];
  public cartlist:any;
  public productList = new BehaviorSubject<any>([]);
  public search = new BehaviorSubject<string>("");
  public itemid:number=0;
  j=0;
  public item:any;
  loggedInEmail=sessionStorage.getItem('loggedUser');
  constructor(private rest:RestService,private api:ApiService) { }

  getProducts(){
    return this.cartlist;
  }

  filterProducts(){
    console.log(this.productList);
  }
 function1(product:any){
   this.cartlist=[];
    this.cartlist=product.value;
    console.log(this.cartlist);
    return this.cartlist;
  };
  addtoCart(item:string):any{
    var itemssplit=item.toString().split("@");
    this.itemid=parseInt(itemssplit[0]);
    console.log(this.itemid);
    this.api.getProductById(this.itemid).subscribe((res:any)=>{
      this.cartItemList.push(res);
      console.log(res);
      this.productList.next(this.cartItemList);
      this.function1(this.productList);
    });
  }

  getTotalPrice(cartlist:any) : number{
    let grandTotal:number=0;
    return grandTotal;
  }
  removeCartItem(product: any,cartlist:any){
    console.log("this is also called");
    this.cartItemList=cartlist;
    console.log(this.cartItemList);


    this.cartItemList.map((a:any, index:any)=>{
      if(product.id=== a.id){
        this.cartItemList.splice(index,1);
      }
    })
    this.productList.next(this.cartItemList);
  }
  removeAllCart(){
    this.cartItemList = []
    this.productList.next(this.cartItemList);
  }
}
