import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  url = environment.apiUrl

  constructor(private httpClient:HttpClient) { }

  singup(data:any){
    return this.httpClient.post(this.url+
      "/user/singup",data,{
        headers : new HttpHeaders().set('Content-Type',"application/json")
      })
  }
}
