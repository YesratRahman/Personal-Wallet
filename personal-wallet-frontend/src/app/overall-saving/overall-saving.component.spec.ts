import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OverallSavingComponent } from './overall-saving.component';

describe('OverallSavingComponent', () => {
  let component: OverallSavingComponent;
  let fixture: ComponentFixture<OverallSavingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OverallSavingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OverallSavingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
