import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateBrassinQuantityComponent } from './update-brassin-quantity.component';

describe('UpdateBrassinQuantityComponent', () => {
  let component: UpdateBrassinQuantityComponent;
  let fixture: ComponentFixture<UpdateBrassinQuantityComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdateBrassinQuantityComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateBrassinQuantityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
