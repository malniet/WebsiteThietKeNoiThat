import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

// Import Containers
import { DefaultLayoutComponent } from './containers';

import { LoginComponent } from './views/login/login.component';
import { LayoutComponent } from './views/layout/layout.component';
import { TrangchuComponent } from './views/trangchu/trangchu.component';
import { DangkyComponent } from './views/dangky/dangky.component';
import { TrangQuanLyLayoutComponent } from './views/trang-quan-ly-layout/trang-quan-ly-layout.component';
import { TrangQuangLyComponent } from './views/trang-quang-ly/trang-quang-ly.component';
import { DanhMucComponent } from './views/danh-muc/danh-muc.component';
import { SanPhamComponent } from './views/san-pham/san-pham.component';
import { SanphamComponent } from './views/sanpham/sanpham.component';
import { ChitietsanphamComponent } from './views/chitietsanpham/chitietsanpham.component';
import { GiohangComponent } from './views/giohang/giohang.component';
import { HoaDonComponent } from './views/hoa-don/hoa-don.component';
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  
  {
    path: 'admin',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'trang-quan-ly',
    component: TrangQuanLyLayoutComponent,
    children: [
      {
      path: 'danh-muc',
      component: DanhMucComponent,
    },
    {
      path: 'san-pham',
      component: SanPhamComponent,
    },
    {
      path: 'hoa-don',
      component: HoaDonComponent,
    },
  ]
  },
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
      path: 'home',
      component: TrangchuComponent,
    },
    {
      path: 'dangky',
      component: DangkyComponent,
    },
    {
      path: 'sanpham',
      component: SanphamComponent,
    },
    {
      path: 'chitiet/:id',
      component: ChitietsanphamComponent,
    },
    {
      path: 'giohang',
      component: GiohangComponent,
    },
  ]
  },
  { path: '**', component: TrangchuComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
