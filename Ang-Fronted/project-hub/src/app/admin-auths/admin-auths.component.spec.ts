import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAuthsComponent } from './admin-auths.component';

describe('AdminAuthsComponent', () => {
  let component: AdminAuthsComponent;
  let fixture: ComponentFixture<AdminAuthsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AdminAuthsComponent]
    });
    fixture = TestBed.createComponent(AdminAuthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
