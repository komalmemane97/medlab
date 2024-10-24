import { Component } from '@angular/core';
import { interval, Subscription } from 'rxjs';
import { ApiService } from 'src/app/core/api.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent {
   userObj:User = new User();
   displayOtpField:boolean=false;
   generatedOtp!:number ;
   sub!:Subscription
   otpTimer!:number;
   disableGetOtpBtn:boolean = false;
   enteredOtp!:number;
  
  errorMessage:string="";
  successMsg:string="";
   constructor(private api:ApiService){

   }


   getOtp() {
    this.displayOtpField = true;
    this.disableGetOtpBtn = true;
    this.generatedOtp = this.generateRandomNumber();
    console.log("Otp", this.generatedOtp);
    this.sub = interval(1000).subscribe({
      next: (resp: any) => {
        console.log(resp);
        this.otpTimer = 60 - resp;
        if (this.otpTimer == 0) {
          this.disableGetOtpBtn = false;
          this.sub.unsubscribe();
        }
      }
    })
  }

   verifyOtp(){
    if(this.generatedOtp == this.enteredOtp){
      this.displayOtpField = false;
      this.userObj.isOtpVerified = true;
    }
  }

  generateRandomNumber() {
    var min = 100000;
    var max = 999999;
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNum;
  }

  signUp(){
    if(this.userObj.isOtpVerified){
        this.api. postDataToServer("users",this.userObj).subscribe({
          next:(response:any)=>{
             if(response != null){
                this.successMsg = "User Registered Successfully";
                this.errorMessage = "";
             }else {
                this.successMsg = "";
                this.errorMessage = "User Not Registered , Please retry again"
             }
          },
          error:(error)=>{

          }
        }) 
    }else {
      this.errorMessage = "Please Verify Mobile No."
    }
  }

}

export class User {
    name!:string;
    email!:string;
    mobileNo!:string;
    isOtpVerified!:boolean;
    password!:string;
}