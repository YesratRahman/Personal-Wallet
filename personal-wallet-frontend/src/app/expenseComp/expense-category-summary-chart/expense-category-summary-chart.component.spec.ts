import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategorySummaryChartComponent } from './expense-category-summary-chart.component';

describe('ExpenseCategorySummaryChartComponent', () => {
  let component: ExpenseCategorySummaryChartComponent;
  let fixture: ComponentFixture<ExpenseCategorySummaryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCategorySummaryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategorySummaryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
