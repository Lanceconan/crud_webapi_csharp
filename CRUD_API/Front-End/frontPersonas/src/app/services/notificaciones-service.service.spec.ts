import { TestBed, inject } from '@angular/core/testing';

import { NotificacionesServiceService } from './notificaciones-service.service';

describe('NotificacionesServiceService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [NotificacionesServiceService]
    });
  });

  it('should be created', inject([NotificacionesServiceService], (service: NotificacionesServiceService) => {
    expect(service).toBeTruthy();
  }));
});
