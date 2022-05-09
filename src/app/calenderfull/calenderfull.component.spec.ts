import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalenderfullComponent } from './calenderfull.component';

describe('CalenderfullComponent', () => {
  let component: CalenderfullComponent;
  let fixture: ComponentFixture<CalenderfullComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CalenderfullComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CalenderfullComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
