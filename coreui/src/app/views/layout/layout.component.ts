import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {User} from '../../models/user';
import { UserService } from '../../services/user.service'
import { Router } from '@angular/router';
@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  @ViewChild('logModal') logM:ModalDirective;
  user: User = {} as User;
  message: string = "";
  loged: number = 0;
  constructor(private userService: UserService, private router:Router) { }

  ngOnInit(): void {
    if(localStorage.getItem("user") != null)
    {
      this.user = JSON.parse(localStorage.getItem("user"));
      this.loged = 1;
    }

  }
  openModalLogin(event) {
    event.preventDefault();
    this.logM.show();
  }
  hideAllModal() {
    this.logM.hide();
  }
  login() {
    this.userService.login(this.user).subscribe(res => {
      this.loged = 1;
      this.user = res;
      localStorage.setItem("user", JSON.stringify(this.user));
      this.hideAllModal();
    }, err=> {
      this.message = "Sai tên tài khoản hoặc mật khẩu"
    })
  }
  dangxuat(event) {
    event.preventDefault();
    this.loged = 0;
    localStorage.removeItem("user");
    this.router.navigate(['home'])
  }

}
