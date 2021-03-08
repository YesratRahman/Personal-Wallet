import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWalletComponent } from './user-wallet.component';

describe('UserExpenseComponent', () => {
  let component: UserWalletComponent;
  let fixture: ComponentFixture<UserWalletComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserWalletComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserWalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});