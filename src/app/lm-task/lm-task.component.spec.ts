import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmTaskComponent } from './lm-task.component';

describe('LmTaskComponent', () => {
  let component: LmTaskComponent;
  let fixture: ComponentFixture<LmTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmTaskComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
