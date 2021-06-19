import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {User} from '../models/user';
import {Email} from '../models/email';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private api: ApiService) { }
  getAll():Observable<[User]>{
    return this.api.get<[User]>(`${this.api.api.user}`);
  }
  get(taikhoan: string):Observable<User>{
    return this.api.get<User>(`${this.api.api.user}/${taikhoan}`);
  }
  post(data: User):Observable<User>{
    return this.api.post<User>(`${this.api.api.user}`,data);
  }
  put(id,data: User):Observable<User>{
    return this.api.put<User>(`${this.api.api.user}/${id}`,data);
  }
  delete(id):Observable<User>{
    return this.api.delete<User>(`${this.api.api.user}/${id}`);
  }
  sendmail(emailk:string,email:Email):Observable<User>{
    return this.api.post<User>(`${this.api.api.sendmail}/${emailk}`,email);
  }
  login(data: User):Observable<User>{
    return this.api.post<User>(`${this.api.api.userlogin}`,data);
  }
}
