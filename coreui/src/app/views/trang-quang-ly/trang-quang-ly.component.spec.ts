import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TrangQuangLyComponent } from './trang-quang-ly.component';

describe('TrangQuangLyComponent', () => {
  let component: TrangQuangLyComponent;
  let fixture: ComponentFixture<TrangQuangLyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TrangQuangLyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TrangQuangLyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
