import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  baseUrl: string = "http://localhost:3000/";
  
  httpHeaders = new HttpHeaders({
    "content-type": "application/json"
  })


  constructor(private http: HttpClient) { }

  getDataFromServer(endpoint: String,httpParams:HttpParams=new HttpParams()) {
    const url = this.baseUrl + endpoint;
    return this.http.get(url, { headers: this.httpHeaders,params:httpParams });
  }

  postDataToServer(endPoint:string,data:any){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,data,{headers:this.httpHeaders});
  }
}