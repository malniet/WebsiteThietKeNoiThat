import { Component, OnInit, ViewChild } from '@angular/core';
import {ModalDirective} from 'ngx-bootstrap';
import {DataTableDirective} from 'angular-datatables';
import { Subject } from 'rxjs';
import {Bill} from '../../models/bill';
import { BillService } from '../../services/bill.service'
import {Billdetail} from '../../models/billdetail';
import { BilldetailService } from '../../services/billdetail.service'

@Component({
  selector: 'app-hoa-don',
  templateUrl: './hoa-don.component.html',
  styleUrls: ['./hoa-don.component.css']
})
export class HoaDonComponent implements OnInit {
  @ViewChild(DataTableDirective) dbElement: DataTableDirective;
  @ViewChild('mdModal') editM:ModalDirective;
  hoadons: Bill[]=[];
  billdetails: Billdetail[]=[];
  dtOptions: DataTables.Settings = {};
  dtTrigger: Subject<Bill> = new Subject();
  constructor(private billService:BillService, private billdetailService: BilldetailService) { }

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
    this.billService.getAll().subscribe(res => {
      this.hoadons = res;
      this.dtTrigger.next();
    })
  }
  hideAllModal() {
    this.editM.hide();
  }
  openEdit(id) {
    this.billdetails= [];
    this.billdetailService.getAll().subscribe(res => {
      console.log(res)
      res.forEach(el => {
        if(el.idBill == id)
        {
          this.billdetails.push(el);
          console.log(id);
          console.log(el)
        }
      })
      this.editM.show()
    })
    
  }
}
