import { TestBed } from '@angular/core/testing';

import { LocalizacionesService } from './localizaciones.service';

describe('LocalizacionesService', () => {
  let service: LocalizacionesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LocalizacionesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
