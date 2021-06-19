import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import {Admin} from '../../models/admin';
import { navItems } from '../../_nav';
@Component({
  selector: 'app-trang-quan-ly-layout',
  templateUrl: './trang-quan-ly-layout.component.html',
  styleUrls: ['./trang-quan-ly-layout.component.css']
})
export class TrangQuanLyLayoutComponent implements OnInit {
  admin: Admin = {} as Admin;
  public navItems = navItems;
  constructor(private cookieService:CookieService) { }

  ngOnInit(): void {
    this.admin = JSON.parse(this.cookieService.get("admin"));
  }

}
