import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Billdetail} from '../models/billdetail';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BilldetailService {

  constructor(private api: ApiService) { }
  getAll():Observable<[Billdetail]>{
    return this.api.get<[Billdetail]>(`${this.api.api.billdetail}`);
  }
  get(id):Observable<Billdetail>{
    return this.api.get<Billdetail>(`${this.api.api.billdetail}/${id}`);
  }
  post(data: Billdetail):Observable<Billdetail>{
    return this.api.post<Billdetail>(`${this.api.api.billdetail}`,data);
  }
  put(id,data: Billdetail):Observable<Billdetail>{
    return this.api.put<Billdetail>(`${this.api.api.billdetail}/${id}`,data);
  }
  delete(id):Observable<Billdetail>{
    return this.api.delete<Billdetail>(`${this.api.api.billdetail}/${id}`);
  }
}
