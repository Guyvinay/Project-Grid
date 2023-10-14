import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnitProjectComponent } from './unit-project.component';

describe('UnitProjectComponent', () => {
  let component: UnitProjectComponent;
  let fixture: ComponentFixture<UnitProjectComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UnitProjectComponent]
    });
    fixture = TestBed.createComponent(UnitProjectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
