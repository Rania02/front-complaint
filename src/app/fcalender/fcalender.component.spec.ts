import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FcalenderComponent } from './fcalender.component';

describe('FcalenderComponent', () => {
  let component: FcalenderComponent;
  let fixture: ComponentFixture<FcalenderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FcalenderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FcalenderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
