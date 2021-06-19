import { Injectable } from '@angular/core';
import {ApiService} from '../services/api.service';
import {Category} from '../models/category';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private api: ApiService) { }
  getAll():Observable<[Category]>{
    return this.api.get<[Category]>(`${this.api.api.category}`);
  }
  get(id):Observable<Category>{
    return this.api.get<Category>(`${this.api.api.category}/${id}`);
  }
  post(data: Category):Observable<Category>{
    return this.api.post<Category>(`${this.api.api.category}`,data);
  }
  put(id,data: Category):Observable<Category>{
    return this.api.put<Category>(`${this.api.api.category}/${id}`,data);
  }
  delete(id):Observable<Category>{
    return this.api.delete<Category>(`${this.api.api.category}/${id}`);
  }
}
