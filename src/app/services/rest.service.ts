import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {map} from 'rxjs/operators';
import {pipe} from 'rxjs';
import { User } from '../modules/admin/components/userdetails/users';
import { UserdetailsComponent } from '../modules/admin/components/userdetails/userdetails.component';
@Injectable({
  providedIn: 'root'
})
export class RestService {

  
  constructor(private http: HttpClient) { 
  }
  baseUrl="http://localhost:8000/";
  postUser(data:any)
  {
    var url=this.baseUrl+'user/insertUser';
    let header={'content-type':'application/json'};
    const body=JSON.stringify(data);
    return this.http.post(url,body,{'headers':header,responseType:'text'});
  }

  getUser()
  {
    var URL = this.baseUrl+'user/getAll';
    //console.log(this.http.get(URL));
    return this.http.get(URL);
  }

  updateUser(data:any)
  {
    var url=this.baseUrl+'user/updateUser';
   let header={'content-type':'application/json'};
    const body=JSON.stringify(data);
    return this.http.put(url,body,{'headers':header,responseType:'text'});
  }

  deleteUser(id: number)
  {
    var url=this.baseUrl+'user/deleteUser/'+id;
    return this.http.delete(url);
    
  }


  
}
