import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Admin} from '../models/admin';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private api: ApiService) { }
  getAll():Observable<[Admin]>{
    return this.api.get<[Admin]>(`${this.api.api.admin}`);
  }
  get(taikhoan: string):Observable<Admin>{
    return this.api.get<Admin>(`${this.api.api.admin}/${taikhoan}`);
  }
  post(data: Admin):Observable<Admin>{
    return this.api.post<Admin>(`${this.api.api.admin}`,data);
  }
  put(id,data: Admin):Observable<Admin>{
    return this.api.put<Admin>(`${this.api.api.admin}/${id}`,data);
  }
  delete(id):Observable<Admin>{
    return this.api.delete<Admin>(`${this.api.api.admin}/${id}`);
  }
  login(data: Admin):Observable<Admin>{
    return this.api.post<Admin>(`${this.api.api.adminlogin}`,data);
  }
}
