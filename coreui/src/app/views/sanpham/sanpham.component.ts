import { Component, OnInit } from '@angular/core';
import {Product} from '../../models/product';
import {Billdetail} from '../../models/billdetail';
import { ProductService } from '../../services/product.service';
import {Category} from '../../models/category';
import { CategoryService } from '../../services/category.service'
import { Bill } from '../../models/bill';
import { Router } from '@angular/router';
@Component({
  selector: 'app-sanpham',
  templateUrl: './sanpham.component.html',
  styleUrls: ['./sanpham.component.css']
})
export class SanphamComponent implements OnInit {
  categories: Category[]=[];
  products: Product[]=[];
  productsview: Product[]=[];
  cart: Billdetail[]=[];
  slgh:number =0;
  constructor(private router: Router,private categoryService: CategoryService, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getAll().subscribe(res => {
      this.categories = res;
    });
    this.productService.getAll().subscribe(res => {
      this.products = res;
      this.productsview = res;
    });
    if(localStorage.getItem("cart") != null)
    {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.slgh = this.cart.length;
    }
  }
  loadByCate(event,id) {
    event.preventDefault();
    this.productsview = [];
    this.products.forEach(a => {
      if(a.loaisanpham == id)
      {
        this.productsview.push(a);
      }
    })
  }
  giohang() {
    this.router.navigate(['giohang']);
  }

}
