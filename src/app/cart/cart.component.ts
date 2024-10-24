import { Component } from '@angular/core';
import { CartService } from './cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  orderObj:Order = new Order();
    
  constructor(private cart:CartService,private router:Router){

  }

  ngOnInit(){
    let cartData = this.cart.getCartDataFromLocalStorage();
    console.log(cartData);
    this.setCartItems(cartData);
    this.calculateTotalPrice();
    this.orderObj.totalItems = this.orderObj.products.length;
  }

  setCartItems(cartData: any) {
    if(cartData != null && cartData.length > 0){
      cartData.forEach((cartItem:any)=>{
        var product = new Product();
         product.productName = cartItem.name;
         product.brand = cartItem.brand;
         product.description = cartItem.description;
         product.actualPrice = cartItem.actualPrice;
         product.quantity = 1;
         product.discountPrice = cartItem.discountPrice;
         product.totalPrice = Number(cartItem.discountPrice) * product.quantity;
         product.type = cartItem.type;
         product.drugCode = cartItem.drugCode;
         product.discount = Number(cartItem.actualPrice) - Number(cartItem.discountPrice);
        this.orderObj.products.push(product)
      })
    }

    console.log("order",this.orderObj);
  }

  calculateTotalPrice() {
    this.orderObj.totalAmount = 0 ;
    this.orderObj.totalDiscounts = 0;
    this.orderObj.products.forEach((productObj:Product)=>{
       this.orderObj.totalAmount += productObj.totalPrice;
       this.orderObj.totalDiscounts += productObj.discount; 
    })
    this.orderObj.finalAmount = this.orderObj.totalAmount - this.orderObj.totalDiscounts;
  }


  quantityChange(type: string, index: number) {
    var seletedProdctObj = this.orderObj.products[index];
    if (type == 'Increase') {
      seletedProdctObj.quantity++
    } else {
      if (seletedProdctObj.quantity == 1) {
        var isSel = confirm("Are you sure you want to remove the following item?");
        if (isSel) {
          this.orderObj.products.splice(index, 1);
        }
      } else {
        seletedProdctObj.quantity--
      }
    }

    seletedProdctObj.totalPrice = (seletedProdctObj.discountPrice * seletedProdctObj.quantity);
    this.orderObj.products[index] = {...seletedProdctObj};
    this.calculateTotalPrice();
  }

  checkout(){
    this.cart.setOrderDetails(this.orderObj);
    this.router.navigate(["/booking-details"]);
  }

}


export class Order {
   orderID!:number;
   fullName!:string;
   mobileNo!:string;
   emailID!:string;
   totalAmount!:number;
   totalItems!:number;
   totalDiscounts!:number;
   finalAmount!:number;
   deliveryType!:string;
   isPaymentCompleted!:boolean;
   addressDetails:Address = new Address();
   products:Product[] = []
}

export class Address {
  city!:string;
  pincode!:number;
  state!:string;
  addressLine1!:string;
  addressLine2!:string;
}

export class Product {
   productName!:string;
   actualPrice!:number;
   quantity!:number;
   drugCode!:string;
   discountPrice!:number;
   description!:string;
   brand!:string;
   type!:string;
   totalPrice!:number;
   discount!:number;
}