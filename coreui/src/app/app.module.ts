import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { LocationStrategy, HashLocationStrategy } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { DataTablesModule } from 'angular-datatables';
import { ModalModule } from 'ngx-bootstrap';
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {AngularFireModule} from '@angular/fire';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireDatabaseModule} from '@angular/fire/database';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

import { AppComponent } from './app.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { LoginComponent } from './views/login/login.component';

const APP_CONTAINERS = [
  DefaultLayoutComponent
];

import {
  AppAsideModule,
  AppBreadcrumbModule,
  AppHeaderModule,
  AppFooterModule,
  AppSidebarModule,
} from '@coreui/angular';

// Import routing module
import { AppRoutingModule } from './app.routing';

// Import 3rd party components
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { ChartsModule } from 'ng2-charts';
import { LayoutComponent } from './views/layout/layout.component';
import { TrangchuComponent } from './views/trangchu/trangchu.component';
import { DangkyComponent } from './views/dangky/dangky.component';
import { TrangQuangLyComponent } from './views/trang-quang-ly/trang-quang-ly.component';
import { TrangQuanLyLayoutComponent } from './views/trang-quan-ly-layout/trang-quan-ly-layout.component';
import { DanhMucComponent } from './views/danh-muc/danh-muc.component';
import { SanPhamComponent } from './views/san-pham/san-pham.component';
import { environment } from '../environments/environment';
import { SanphamComponent } from './views/sanpham/sanpham.component';
import { ChitietsanphamComponent } from './views/chitietsanpham/chitietsanpham.component';
import { GiohangComponent } from './views/giohang/giohang.component';
import { HoaDonComponent } from './views/hoa-don/hoa-don.component';

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    AppAsideModule,
    AppBreadcrumbModule.forRoot(),
    AppFooterModule,
    AppHeaderModule,
    AppSidebarModule,
    PerfectScrollbarModule,
    BsDropdownModule.forRoot(),
    TabsModule.forRoot(),
    ChartsModule,
    HttpClientModule,
    FormsModule,
    DataTablesModule,
    ModalModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ],
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    LoginComponent,
    LayoutComponent,
    TrangchuComponent,
    DangkyComponent,
    TrangQuangLyComponent,
    TrangQuanLyLayoutComponent,
    DanhMucComponent,
    SanPhamComponent,
    SanphamComponent,
    ChitietsanphamComponent,
    GiohangComponent,
    HoaDonComponent,
  ],
  providers: [{
    provide: LocationStrategy,
    useClass: HashLocationStrategy
  }],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
