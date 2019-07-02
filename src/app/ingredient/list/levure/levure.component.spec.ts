import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LevureComponent } from './levure.component';

describe('LevureComponent', () => {
  let component: LevureComponent;
  let fixture: ComponentFixture<LevureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LevureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LevureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
