import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Order } from './cart.component';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  cartItems:any=[];

  cartCountSub:BehaviorSubject<number> = new BehaviorSubject(0);
  cartCountObs$ = this.cartCountSub.asObservable();

  private orderDetails!:Order;

  constructor() { }

   sendCartCount(count:number){
     this.cartCountSub.next(count); 
   }


  getCartDataFromLocalStorage(): any {
    let cartArr: any = [];
    let cartData = localStorage.getItem("cart");
   
    if (cartData != null) {
      cartArr = JSON.parse(cartData);
      return cartArr;
    } else {
      return cartArr;
    }
  }

  addToCart(productObj: any){
    if(productObj){
      //lets check if data is available in local storage i
      //if available then add data to existing cart.
      this.cartItems = this.getCartDataFromLocalStorage();
      this.cartItems.push(productObj);
      let carItemsStr = JSON.stringify(this.cartItems);
      localStorage.setItem("cart",carItemsStr);
      this.sendCartCount(this.cartItems.length);
    }
  }
  
  setOrderDetails(order:any){
    this.orderDetails = order;
  }

  getOrderDetails(){
   return this.orderDetails;
  }

  removeItemdFromCart(){
    localStorage.removeItem("cart");
  }
}