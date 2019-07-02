import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrassinDetail } from './brassinDetail';

describe('BrassinList', () => {
  let component: BrassinDetail;
  let fixture: ComponentFixture<BrassinDetail>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrassinDetail ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrassinDetail);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
