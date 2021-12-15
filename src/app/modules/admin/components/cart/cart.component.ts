import { Component, OnInit, DoCheck } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { RestService } from 'src/app/services/rest.service';
import { User } from '../userdetails/users';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {

  public products: any = [];
  public grandTotal !: number;
  public usersList: any;
  public usersList1: any;
  public itemid: number = 0;
  public itemquantity: number = 0;
  public itemtotal: number = 0;
public grandtotal1:number=0;
q1 = 0;
total1 = 0;
  constructor(private rest: RestService, private cartService: CartService, private _snackbar: MatSnackBar, private api: ApiService) { }

  loggedInEmail = sessionStorage.getItem('loggedUser');
  userObj: User = new User;
  ngOnInit(): void {
    this.function1();
  }

  function1() {
    this.rest.getUser().subscribe((res: any) => {
      this.grandtotal1=0;
      this.grandTotal=0;
      this.usersList = res;
      this.products = [];

      let objarray: any[] = [];
      for (let i = 0; i < this.usersList.length; i++) {
        if (this.usersList[i].email == this.loggedInEmail) {
          console.log(this.usersList[i].cart.length);
          for (let j = 0; j < this.usersList[i].cart.length; j++) {
            this.itemid = parseInt(this.usersList[i].cart[j].substr(0, this.usersList[i].cart[j].indexOf('@')));
            this.api.getProductById(this.itemid).subscribe((res: any) => {
              this.products.push(res);
              console.log(this.products.length);
              this.products.forEach((a: any) => {
                Object.assign(a, { quantity: this.q1, total:this.q1 * a.price });
                console.log(typeof(this.q1),typeof(a.price));
                if(a.length<=2){
                  this.grandtotal1+=this.q1*a.price;
                }
                this.grandTotal=this.grandtotal1
                this.grandtotal1+=this.q1*a.price
                console.log(this.grandtotal1);
                this.itemquantity = parseInt(this.usersList[i].cart[j].substr(this.itemid.toString.length + 1, this.usersList[i].cart[j].indexOf('@')));
                console.log(this.itemquantity);
                let l = (this.itemquantity.toString).length + 1 + (this.itemid.toString).length + 1;
                this.itemtotal = parseInt(this.usersList[i].cart[j].substr(l, (this.usersList[i].cart[j].length) - l));
                this.q1 = this.itemquantity;
                this.total1 = this.itemtotal;
                console.log(this.q1, this.total1);
                objarray.push(this.q1)
                console.log(objarray);
              });
            });
          }
        }
      }
    });
  }
  toremovecartlist: any = [];
  removeItem(item: any) {
    console.log(item);
    for (let i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == this.loggedInEmail) {
        this.toremovecartlist = this.usersList[i].cart;
        for (let j = 0; j < this.usersList[i].cart.length; j++) {
          this.itemid = parseInt(this.usersList[i].cart[j].substr(0, this.usersList[i].cart[j].indexOf('@')));
          if (this.itemid == item.id) {
            this.usersList[i].cart.splice(j, 1);
            console.log(this.usersList[i].cart);
            this.userObj.id = this.usersList[i].id;
            this.userObj.name = this.usersList[i].name;
            this.userObj.loc = this.usersList[i].loc;
            this.userObj.email = this.usersList[i].email;
            this.userObj.phoneno = this.usersList[i].phoneno;
            this.userObj.password = this.usersList[i].password;
            this.userObj.cart = this.usersList[i].cart;
            console.log(this.userObj.cart);
            this.rest.updateUser(this.userObj).subscribe(res => {
              this.function1();
            })
          }
        }
        console.log(this.toremovecartlist);
      }

    }
    location.reload();
    //this.cartService.removeCartItem(item,this.toremovecartlist);
  }
  emptycart() {
    for (let i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == this.loggedInEmail) {
        this.userObj.id = this.usersList[i].id;
        this.userObj.name = this.usersList[i].name;
        this.userObj.email = this.usersList[i].email;
        this.userObj.loc = this.usersList[i].loc;
        this.userObj.phoneno = this.usersList[i].phoneno;
        this.userObj.password = this.usersList[i].password;
        this.usersList[i].cart = [];
        this.userObj.cart = this.usersList[i].cart;
        console.log(this.usersList[i].cart);
        this.products = this.usersList[i].cart;
      }
    }
    this.rest.updateUser(this.userObj).subscribe(res => {
      this.function1();
    })

  }
  price: number = 0;
  cartdetails: string = "";
  inc(item: any) {
    for (let i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == this.loggedInEmail) {
        this.userObj.id = this.usersList[i].id;
        this.userObj.name = this.usersList[i].name;
        this.userObj.email = this.usersList[i].email;
        this.userObj.loc = this.usersList[i].loc;
        this.userObj.phoneno = this.usersList[i].phoneno;
        this.userObj.password = this.usersList[i].password;
        for (let j = 0; j < this.usersList[i].cart.length; j++) {
          this.itemid = parseInt(this.usersList[i].cart[j].substr(0, this.usersList[i].cart[j].indexOf('@')));
          this.itemquantity = parseInt(this.usersList[i].cart[j].substr(this.itemid.toString.length + 1, this.usersList[i].cart[j].indexOf('@')));
          console.log(this.itemquantity);
          this.cartdetails = this.usersList[i].cart[j];
          let l = (this.itemquantity.toString).length + 1 + (this.itemid.toString).length + 1;
          this.itemtotal = parseInt(this.usersList[i].cart[j].substr(l, (this.cartdetails.length) - l));
          console.log(this.itemtotal);
          this.price = this.itemtotal / this.itemquantity;
          console.log(this.price);
          if (this.itemid == item.id) {
            this.itemquantity++;
            console.log(this.itemquantity);
            this.itemtotal = this.itemquantity * this.price;
            console.log(this.itemtotal);
            this.usersList[i].cart[j] = `${this.itemid}@${this.itemquantity}@${this.itemtotal}`
            this.userObj.cart = this.usersList[i].cart;
            this.rest.updateUser(this.userObj).subscribe(res => {
              this.grandtotal1+=this.price;
               this.function1();
            })
            
          }
        }
      }
    }
    location.reload()
  }
  dec(item: any) {
    for (let i = 0; i < this.usersList.length; i++) {
      if (this.usersList[i].email == this.loggedInEmail) {
        this.userObj.id = this.usersList[i].id;
        this.userObj.name = this.usersList[i].name;
        this.userObj.email = this.usersList[i].email;
        this.userObj.loc = this.usersList[i].loc;
        this.userObj.phoneno = this.usersList[i].phoneno;
        this.userObj.password = this.usersList[i].password;
        for (let j = 0; j < this.usersList[i].cart.length; j++) {
          this.itemid = parseInt(this.usersList[i].cart[j].substr(0, this.usersList[i].cart[j].indexOf('@')));
          this.itemquantity = parseInt(this.usersList[i].cart[j].substr(this.itemid.toString.length + 1, this.usersList[i].cart[j].indexOf('@')));
          console.log(this.itemquantity);
          this.cartdetails = this.usersList[i].cart[j];
          let l = (this.itemquantity.toString).length + 1 + (this.itemid.toString).length + 1;
          this.itemtotal = parseInt(this.usersList[i].cart[j].substr(l, (this.cartdetails.length) - l));
          console.log(this.itemtotal);
          this.price = this.itemtotal / this.itemquantity;
          console.log(this.price);
          if (this.itemid == item.id) {
            if (this.itemquantity != 1) {
              this.itemquantity--;
              console.log(this.itemquantity);
              this.itemtotal = this.itemquantity * this.price;
              console.log(this.itemtotal);
              this.usersList[i].cart[j] = `${this.itemid}@${this.itemquantity}@${this.itemtotal}`
              this.userObj.cart = this.usersList[i].cart;
              this.rest.updateUser(this.userObj).subscribe(res => {
                this.grandtotal1-=this.price;
                this.function1();
              })
            }
          }
        }
      }
    }
    location.reload();

  }

}
