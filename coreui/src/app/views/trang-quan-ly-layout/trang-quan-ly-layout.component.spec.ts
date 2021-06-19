import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangQuanLyLayoutComponent } from './trang-quan-ly-layout.component';

describe('TrangQuanLyLayoutComponent', () => {
  let component: TrangQuanLyLayoutComponent;
  let fixture: ComponentFixture<TrangQuanLyLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangQuanLyLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangQuanLyLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
