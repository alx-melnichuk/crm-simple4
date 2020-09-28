import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LmClientComponent } from './lm-client.component';

describe('LmClientComponent', () => {
  let component: LmClientComponent;
  let fixture: ComponentFixture<LmClientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LmClientComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LmClientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
