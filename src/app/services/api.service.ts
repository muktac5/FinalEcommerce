import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient:HttpClient) { }
  baseUrl="http://localhost:8000/";
 getProduct(){
    var URL = this.baseUrl+'prod/getAllProd';
    console.log(this.httpClient.get(URL));
    return this.httpClient.get(URL);
  }
getProductById(id:number){
    var URL = this.baseUrl+'prod/getProdById/'+id;
    //console.log(this.httpClient.get(URL));
    return this.httpClient.get(URL);
  }
}


