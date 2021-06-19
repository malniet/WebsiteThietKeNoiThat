import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor( private http : HttpClient) { }
  url = "http://localhost:5000";
  api = {
    user:`${this.url}/api/user`,
    bill:`${this.url}/api/bill`,
    billdetail:`${this.url}/api/billdetail`,
    userlogin:`${this.url}/api/user/dangnhap`,
    category:`${this.url}/api/category`,
    product:`${this.url}/api/product`,
    admin:`${this.url}/api/admin`,
    adminlogin:`${this.url}/api/admin/dangnhap`,
    sendmail:`${this.url}/api/user/sendmail`,
  }
  get<T>(url:string):Observable<T>{
    return this.http.get<T>(url);
  }
  delete<T>(url:string):Observable<T>{
    return this.http.delete<T>(url);
  }
  put<T>(url:string, data:Object):Observable<T>{
    return this.http.put<T>(url,data);
  }
  post<T>(url:string, data:Object):Observable<T>{
    return this.http.post<T>(url,data);
  }
}
