import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HoublonComponent } from './houblon.component';

describe('HoublonComponent', () => {
  let component: HoublonComponent;
  let fixture: ComponentFixture<HoublonComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HoublonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HoublonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
