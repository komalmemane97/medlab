import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilityService {
 private selectedPinCodeObj : any ;

  constructor() { }

  setPinCodeDetails(obj:any){
    this.selectedPinCodeObj = obj;
  }

  getPinCodeDetails(){
     return this.selectedPinCodeObj;
  }

  getAuthToken() {
    let token = localStorage.getItem("token");
    if (token != null) {
      return true;
    } else {
      return false;
    }
  }

  getUserDetails() {
    let userDetls = null;
    let data = localStorage.getItem("userDetails");
    if (data != null) {
      userDetls = JSON.parse(data);
    }
    return userDetls;
  }
}