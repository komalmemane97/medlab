import { Component } from '@angular/core';
import { CartService } from '../cart.service';
import { Order } from '../cart.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ApiService } from 'src/app/core/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-booking-details',
  templateUrl: './booking-details.component.html',
  styleUrls: ['./booking-details.component.scss']
})
export class BookingDetailsComponent {
   orderDetails!:Order
   bookingForm!:FormGroup;


   constructor(private cart:CartService,private fb:FormBuilder,private api:ApiService,private router:Router){
      this.orderDetails = this.cart.getOrderDetails();
      console.log("orderDetails",this.orderDetails);
   }

   ngOnInit(){
     this.initBookingForm();
   }

   initBookingForm(){
      this.bookingForm = this.fb.group({
        fullName:[''],
        mobileNo:[''],
        gender:[''],
        dob:[''],
        emailId:[''],
        address:this.fb.group({
          city:[''],
          addressLine1:[''],
          addressLine2:[''],
          pincode:[''],
          state:['']
        })
      })
   }

   placeOrder(){
    //

    this.orderDetails.fullName = this.bookingForm.get('fullName')?.value;
    this.orderDetails.mobileNo = this.bookingForm.get('mobileNo')?.value;
    this.orderDetails.emailID = this.bookingForm.get('emailId')?.value;
    this.orderDetails.addressDetails = this.bookingForm.get('address')?.value;
    this.orderDetails.orderID = this.generateRandomNumber();

    this.api.postDataToServer("order",this.orderDetails).subscribe({
      next:(resp:any)=>{
         this.cart.removeItemdFromCart();
         alert("You order has been placed successfully");
         this.router.navigate(["/home"]);
      }
    })
   }


   generateRandomNumber() {
    var min = 100000;
    var max = 999999;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  }
}