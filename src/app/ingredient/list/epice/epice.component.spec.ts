import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EpiceComponent } from './epice.component';

describe('EpiceComponent', () => {
  let component: EpiceComponent;
  let fixture: ComponentFixture<EpiceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EpiceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EpiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
