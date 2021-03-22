import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { WalletService } from './wallet.service';

describe('WalletService', () => {
  let service: WalletService;
  let http: {get: jasmine.Spy, post : jasmine.Spy}; 

  beforeEach(() => {
    TestBed.configureTestingModule({});
    http = jasmine.createSpyObj(WalletService, ['HttpClient',['get', 'post'] ]);
    service = new WalletService(HttpClient as any)
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

