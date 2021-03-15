import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseCategoryChartComponent } from './expense-category-chart.component';

describe('ExpenseCategoryChartComponent', () => {
  let component: ExpenseCategoryChartComponent;
  let fixture: ComponentFixture<ExpenseCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExpenseCategoryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpenseCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
