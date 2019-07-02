import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BrassinList } from './brassin-list.component';

describe('BrassinList', () => {
  let component: BrassinList;
  let fixture: ComponentFixture<BrassinList>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BrassinList ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BrassinList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
