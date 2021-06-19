import { Component, OnInit } from '@angular/core';
import { Router,ActivatedRoute } from '@angular/router';
import {Product} from '../../models/product';
import {Billdetail} from '../../models/billdetail';
import { ProductService } from '../../services/product.service';
@Component({
  selector: 'app-chitietsanpham',
  templateUrl: './chitietsanpham.component.html',
  styleUrls: ['./chitietsanpham.component.css']
})
export class ChitietsanphamComponent implements OnInit {
  slgh: number = 0;
  id: string = ""
  product: Product = {} as Product;
  billd: Billdetail = {} as Billdetail;
  cart: Billdetail[] = [];
  sl:number = 0;
  constructor(private router:Router,private productService: ProductService,private route : ActivatedRoute) { this.id = this.route.snapshot.paramMap.get("id") }

  ngOnInit(): void {
    this.productService.get(this.id).subscribe(res => {
      this.product = res;
    });
    if(localStorage.getItem("cart") != null)
    {
      this.cart = JSON.parse(localStorage.getItem("cart"));
      this.slgh = this.cart.length;
    }
  }
  themvaogio() {
    if(this.sl < 1)
    {
      alert("Chưa nhập số lượng");
      return;
    }
    if(this.product.soluong < 1)
    {
      alert("Hết hàng");
      return;
    }
    var x=0;
    this.cart.forEach(c => {
      if(c.idP == this.product.id)
      {
        c.soluong = c.soluong +  this.sl;
        x = 1 ;
        localStorage.setItem("cart",JSON.stringify(this.cart));
        this.slgh = this.cart.length;
      }
    })
    if(x == 0) {
      this.billd.idP =  this.product.id;
      this.billd.dongia = this.product.dongia;
      this.billd.soluong = this.sl;
      this.billd.tensanpham = this.product.tensanpham;
      this.cart.push(this.billd);
      localStorage.setItem("cart",JSON.stringify(this.cart));
      this.slgh = this.cart.length;
    }
  }
  giohang() {
    this.router.navigate(['giohang']);
  }

}
