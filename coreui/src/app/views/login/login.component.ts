import { Component, OnInit } from '@angular/core';
import {Admin} from '../../models/admin';
import { AdminService} from '../../services/admin.service'
import { CookieService } from 'ngx-cookie-service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit {
  admin: Admin = {} as Admin;
  constructor(private cookiseService:CookieService,private adminService: AdminService, private router :Router) { }

  ngOnInit(): void {
    
  }
  login() {
    //console.log(this.admin)
    this.adminService.login(this.admin).subscribe(res => {
      this.cookiseService.set("admin",JSON.stringify(this.admin));
      this.router.navigate(['trang-quan-ly']);
    })
  }
}
