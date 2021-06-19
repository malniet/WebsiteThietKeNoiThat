import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import {Product} from '../../models/product';
import { ProductService } from '../../services/product.service';
import { AngularFireStorage } from '@angular/fire/storage';
import { catchError, finalize } from 'rxjs/operators';
import {Category} from '../../models/category';
import { CategoryService } from '../../services/category.service'
@Component({
  selector: 'app-san-phan',
  templateUrl: './san-pham.component.html',
  styleUrls: ['./san-pham.component.css']
})
export class SanPhamComponent implements OnInit {
  @ViewChild(DataTableDirective) dbElement: DataTableDirective;
  @ViewChild('mdModal') editM:ModalDirective;
  products: Product[]=[];
  Product: Product = {} as Product;
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Product> = new Subject();
  temp: string = "";
  message: string = "";
  s: number = 0;
  selectImg: any;
  imgUrl: string = "";
  categories: Category[]=[];
  constructor(private storage: AngularFireStorage,private productservice: ProductService, private cateService: CategoryService) { }
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
    this.productservice.getAll().subscribe(res =>{
      this.products = res;
      this.dtTrigger.next();
    });
    this.cateService.getAll().subscribe(res => {
      this.categories = res;
    })
  }
  load() { 
    this.message = "";
    this.products=[];
    
      
        this.dbElement.dtInstance.then((dtInstance: DataTables.Api) => {
          dtInstance.destroy();
          this.productservice.getAll().subscribe(res =>{
           this.products = res;
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
    this.productservice.get(id).subscribe(res => {
      this.Product = res;
      this.imgUrl = res.hinhanh;
      this.editM.show();
    })
    
  }
  openAddModal() {
    this.s = 0;
    this.imgUrl = "";
    this.Product = {} as Product;
    this.temp = "Thêm mới thông tin";
    this.editM.show();
  }
  edit() {
    if(this.Product.tensanpham.length <4 ||this.Product.tensanpham.length >50)
    {
      this.message="Tên sản phẩm phải trong khoảng 4 đến 50 ký tự";
      return;
    }
    if(this.Product.dongia < 0 || this.Product.dongia%1000 !=0)
    {
      this.message="Đơn giá phải lớn hơn 0 và chia hết cho 1000";
      return;
    }
    this.productservice.put(this.Product.id,this.Product).subscribe(res => {
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
    if(this.Product.tensanpham.length <4 ||this.Product.tensanpham.length >50)
    {
      this.message="Tên sản phẩm phải trong khoảng 4 đến 50 ký tự";
      return;
    }
    if(this.Product.dongia < 0 || this.Product.dongia%1000 !=0)
    {
      this.message="Đơn giá phải lớn hơn 0 và chia hết cho 1000";
      return;
    }
    this.Product.hienthi = 0;
    this.productservice.post(this.Product).subscribe(res => {
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
    this.productservice.delete(id).subscribe(res => {
     
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
 uploadFile(event:any) {
  if(event.target.files && event.target.files[0])
  {
    const reader = new FileReader();
    reader.onload = (e:any) => this.imgUrl = e.target.result;
    reader.readAsDataURL(event.target.files[0]);
    this.selectImg = event.target.files[0];
    this.up();
  }
  else 
  {
    this.selectImg = null;
  }
}
up() {
  if(this.selectImg != null)
  {
    const filePath =`product/${this.selectImg.name.split('.').slice(0,-1).join('.')}_${new Date().getTime()}`;
    const fileRef = this.storage.ref(filePath);
    this.storage.upload(filePath, this.selectImg).snapshotChanges().pipe(
      finalize(()=> {
        fileRef.getDownloadURL().subscribe(url => {
          this.imgUrl = url;
          this.Product.hinhanh = url;
         
            this.productservice.post(this.Product).subscribe(res=> {
              this.load();
              this.hideAllModal();
            })
          
          
        })
      })
    ).subscribe();
  }
}
}
