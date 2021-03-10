import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseMonthlySummaryComponent } from './expense-monthly-summary.component';

describe('ExpenseMonthlySummaryComponent', () => {
  let component: ExpenseMonthlySummaryComponent;
  let fixture: ComponentFixture<ExpenseMonthlySummaryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseMonthlySummaryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseMonthlySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
