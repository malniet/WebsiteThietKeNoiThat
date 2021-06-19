import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Bill} from '../models/bill';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BillService {

  constructor(private api: ApiService) { }
  getAll():Observable<[Bill]>{
    return this.api.get<[Bill]>(`${this.api.api.bill}`);
  }
  get(id):Observable<Bill>{
    return this.api.get<Bill>(`${this.api.api.bill}/${id}`);
  }
  post(data: Bill):Observable<Bill>{
    return this.api.post<Bill>(`${this.api.api.bill}`,data);
  }
  put(id,data: Bill):Observable<Bill>{
    return this.api.put<Bill>(`${this.api.api.bill}/${id}`,data);
  }
  delete(id):Observable<Bill>{
    return this.api.delete<Bill>(`${this.api.api.bill}/${id}`);
  }
}
