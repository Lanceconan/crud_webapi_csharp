import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { NotificacionComponent } from '../components/notificacion/notificacion.component';
import { ModeloNotificacion } from '../models/ModeloNotificacion';

@Injectable()
export class NotificacionesServiceService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(message: string, type?: string) {
    this.snackBar.openFromComponent(NotificacionComponent, {
      duration: 3000,
      data: new ModeloNotificacion(message, type ? type : 'error')
    });
  }
}
