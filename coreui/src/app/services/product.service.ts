
import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Product} from '../models/Product';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private api: ApiService) { }
  getAll():Observable<[Product]>{
    return this.api.get<[Product]>(`${this.api.api.product}`);
  }
  get(id):Observable<Product>{
    return this.api.get<Product>(`${this.api.api.product}/${id}`);
  }
  post(data: Product):Observable<Product>{
    return this.api.post<Product>(`${this.api.api.product}`,data);
  }
  put(id,data: Product):Observable<Product>{
    return this.api.put<Product>(`${this.api.api.product}/${id}`,data);
  }
  delete(id):Observable<Product>{
    return this.api.delete<Product>(`${this.api.api.product}/${id}`);
  }
}
