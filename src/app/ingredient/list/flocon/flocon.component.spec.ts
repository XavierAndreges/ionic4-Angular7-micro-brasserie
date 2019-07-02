import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FloconComponent } from './flocon.component';

describe('FloconComponent', () => {
  let component: FloconComponent;
  let fixture: ComponentFixture<FloconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FloconComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FloconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
