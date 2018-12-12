import { Component, OnInit, Inject } from '@angular/core';
import { MAT_SNACK_BAR_DATA } from '@angular/material';
import { ModeloNotificacion } from 'src/app/models/ModeloNotificacion';

@Component({
  selector: 'app-notificacion',
  templateUrl: './notificacion.component.html',
  styleUrls: ['./notificacion.component.css']
})
export class NotificacionComponent implements OnInit {
  
  message: string;
  type: string;

  constructor(@Inject(MAT_SNACK_BAR_DATA) public data: ModeloNotificacion) { }

  ngOnInit() {
    this.message = this.data.message;
    this.type = this.data.type;
  }

}
