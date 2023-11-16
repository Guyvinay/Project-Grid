import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InitsComponent } from './inits.component';

describe('InitsComponent', () => {
  let component: InitsComponent;
  let fixture: ComponentFixture<InitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InitsComponent]
    });
    fixture = TestBed.createComponent(InitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
