import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import {Category} from '../../models/category';
import { CategoryService } from '../../services/category.service'
@Component({
  selector: 'app-danh-muc',
  templateUrl: './danh-muc.component.html',
  styleUrls: ['./danh-muc.component.css']
})
export class DanhMucComponent implements OnInit {
  @ViewChild(DataTableDirective) dbElement: DataTableDirective;
  @ViewChild('mdModal') editM:ModalDirective;
  categories: Category[]=[];
  category: Category = {} as Category;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Category> = new Subject();
  temp: string = "";
  message: string = "";
  s: number = 0;
  constructor(private categorieservice: CategoryService) { }
  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength:5,
      language: {
        search: "Tìm kiếm:",
        lengthMenu: "Hiển thị _MENU_ bản ghi",
        info: "Hiển thị _START_ đến _END_ trong số _TOTAL_ bản ghi",
        paginate: {
          first: "Đầu tiên",
          previous: "Trước",
          next: "Sau",
          last: "Cuối cùng"
        },
      }
    };
    this.categorieservice.getAll().subscribe(res =>{
      this.categories = res;
      this.dtTrigger.next();
    })
  }
  load() { 
    this.categories=[];
    
      
        this.dbElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.categorieservice.getAll().subscribe(res =>{
           this.categories = res;
            this.dtTrigger.next();
          })
        });
        
  }
  hideAllModal() {
    this.editM.hide();
  }
  openEdit(id) {
    this.s = 1;
    this.temp = "Chỉnh sửa thông tin";
    this.categorieservice.get(id).subscribe(res => {
      this.category = res;
      this.editM.show();
    })
    
  }
  openAddModal() {
    this.s = 0;
    this.category= {} as Category;
    this.temp = "Thêm mới thông tin";
    this.editM.show();
  }
  edit() {
    if(this.category.tendanhmuc.length <4 ||this.category.tendanhmuc.length >50)
    {
      this.message="Tên danh mục phải trong khoảng 4 đến 50 ký tự";
      return;
    }
    this.categorieservice.put(this.category.id,this.category).subscribe(res => {
      this.editM.hide();
      this.load();
    },err =>{
      if(err==500)
      {
        this.message="Nhập thiếu thông tin";
      }
    })
  }
  add() {
    if(this.category.tendanhmuc.length <4 ||this.category.tendanhmuc.length >50)
    {
      this.message="Tên danh mục phải trong khoảng 4 đến 50 ký tự";
      return;
    }
    this.categorieservice.post(this.category).subscribe(res => {
      this.editM.hide();
      this.load();
      
    },err =>{
      if(err.status==500)
      {
        this.message="Nhập thiếu thông tin";
      }
    })
  }
// delete
 delete(id) {
  event.preventDefault();
  if(confirm("Bạn có chắc chắn muốn xóa ")) {
    console.log("Implement delete functionality here");
    this.categorieservice.delete(id).subscribe(res => {
     
      this.load(); 
    });
  }
 }
 save() {
  if(this.s == 0)
  {
    this.add();
  }
  else 
  {
    this.edit();
  }
 }
}
