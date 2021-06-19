import { Component, OnInit } from '@angular/core';
import { User } from '../../models/user';
import { Email } from '../../models/email';
import { UserService } from '../../services/user.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dangky',
  templateUrl: './dangky.component.html',
  styleUrls: ['./dangky.component.css']
})
export class DangkyComponent implements OnInit {

  user: User = {} as User;
  users: User[]=[];
  emailk:string = "";
  ma:string = "";
  email: Email = {} as Email;
  manhinh:number = 0;
  mxn: string ="";
  messageError: string = "";
  matkhau:string = "";
  constructor(private userService: UserService, private router :Router) { }

  ngOnInit(): void {
    
  }
  sendemail() {
    if(this.emailk == "")
    {
      this.messageError = "Chưa nhập email !!!";
      return;
    }
    this.messageError ="";
    this.email.subject = "Xác thực tài khoản Malniet TS";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
 
    for (var i = 0; i < 4; i++)
      this.ma += possible.charAt(Math.floor(Math.random() * possible.length));
 
    this.email.noidung = "Đây là mã xác nhận email của bạn: " + this.ma;
    this.userService.sendmail(this.emailk, this.email).subscribe(res => {
      
    });
    this.manhinh = 1;
  }
  xacnhanma() {
    if(this.mxn.toLocaleLowerCase() !== this.ma.toLocaleLowerCase())
    {
      this.messageError = "Nhập sai mã xác nhận"
    }
    else 
    {
      this.messageError = "";
      this.user.email = this.emailk;
      this.manhinh = 2;
    }
  }
  dky() {
    var sdtt = /(09|01[2|6|8|9])+([0-9]{8})\b/g;
    var requirepassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/
    if(this.user.hovaten == "" || this.user.hovaten == null || this.user.taikhoan == "" 
    || this.user.taikhoan == null || this.user.matkhau == "" || this.user.matkhau == null
     ||this.user.diachi == "" || this.user.diachi == null ||this.user.sdt == "" 
     || this.user.sdt == null || this.matkhau == "" || this.matkhau == null)
     {
       this.messageError = "Nhập thiếu thông tin";
       return;
     }
     if(requirepassword.test(this.user.matkhau) == false)
     {
      this.messageError = "Mật khẩu tối thiểu tám ký tự, ít nhất một chữ cái viết hoa, một chữ cái viết thường, một số và một ký tự đặc biệt";
      return;
     }
     if(this.matkhau !== this.user.matkhau)
     {
      this.messageError = "Mật khẩu nhập lại chưa khớp";
      return;
     }
     if(sdtt.test(this.user.sdt) == false) {
      this.messageError = "Số điện thoại không hợp lệ";
      return;
     }
     if(this.user.taikhoan.length < 5 && this.user.taikhoan.length > 20)
     {
      this.messageError = "Tài khoản phải trong khoảng 5 đến 20 ký tự";
      return;
     }
     if(this.user.matkhau.length < 5 && this.user.matkhau.length > 20)
     {
      this.messageError = "Mật khẩu phải trong khoảng 5 đến 20 ký tự";
      return;
     }
     if(this.user.diachi.length < 10 && this.user.diachi.length > 200)
     {
      this.messageError = "Địa chỉ phải trong khoảng 10 đến 200 ký tự";
      return;
     }
     if(this.user.hovaten.length < 5 && this.user.hovaten.length > 200)
     {
      this.messageError = "Họ tên phải trong khoảng 5 đến 200 ký tự";
      return;
     }
     this.messageError = "";
     this.userService.post(this.user).subscribe(res => {
        this.manhinh = 3;
     }, err => {
      this.messageError = "Trùng tên tài khoản";
     })
  }
  ok() {
    this.router.navigate(['home']);
  }
}
