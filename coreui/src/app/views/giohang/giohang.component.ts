import { Component, OnInit } from '@angular/core';
import {Billdetail} from '../../models/billdetail';
import {Bill} from '../../models/bill';
import {User} from '../../models/user';
import {BillService} from '../../services/bill.service';
import {BilldetailService} from '../../services/billdetail.service';
@Component({
  selector: 'app-giohang',
  templateUrl: './giohang.component.html',
  styleUrls: ['./giohang.component.css']
})
export class GiohangComponent implements OnInit {
  cart: Billdetail[]=[];
  bill: Bill = {} as Bill;
  tong: number = 0;
  user: User = {} as User;
  constructor(private billService: BillService, private billdetailService: BilldetailService) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") != null)
    {
      this.user =  JSON.parse(localStorage.getItem("user"));
      this.bill.hovaten = this.user.hovaten;
      this.bill.diachi = this.user.diachi;
      this.bill.sdt = this.user.sdt;
    }
    if(localStorage.getItem("cart") != null)
    {
      this.cart = JSON.parse(localStorage.getItem("cart"))
      this.cart.forEach(ele => {
        this.tong += ele.dongia*ele.soluong;
      })
    }
  }
  delete(id) {
    this.cart.forEach(el => {
      if(el.idP == id) {
        this.cart.splice(this.cart.indexOf(el),1);
        localStorage.setItem("cart",JSON.stringify(this.cart));
        this.tong -= el.soluong*el.dongia;
      }
    });
  }
  checkout() {
    var sdt = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
    if(this.bill.diachi == null || this.bill.hovaten == null || this.bill.sdt == null)
    {
      alert("Chưa nhập đủ thông tin");
      return;
    }
    if(sdt.test(this.bill.sdt) == false)
    {
      alert("Số điện thoại không hợp lệ");
      return;
    }
    // thêm hóa đơn
    var date = new Date();
    this.bill.ngaytao = date.getDate() + "/" + (date.getMonth()+1) + "/" +date.getFullYear();
    this.billService.post(this.bill).subscribe(res => {
      this.cart.forEach(el => {
        el.idBill = res.id;
        this.billdetailService.post(el).subscribe(res => {
          
        });
        if(this.cart.indexOf(el) == this.cart.length-1)
        {
          localStorage.removeItem("cart");
          window.location.reload();
        }
      });
      alert("Lưu hóa đơn thành công");
    })
  }
}
