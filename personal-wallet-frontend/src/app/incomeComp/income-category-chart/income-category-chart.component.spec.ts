import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IncomeCategoryChartComponent } from './income-category-chart.component';

describe('IncomeCategoryChartComponent', () => {
  let component: IncomeCategoryChartComponent;
  let fixture: ComponentFixture<IncomeCategoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ IncomeCategoryChartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(IncomeCategoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
