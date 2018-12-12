import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { MaterialModule } from './app.materialmodule';
import { PersonasService } from './services/personas.service';
import { HttpClientModule } from '@angular/common/http';
import { NotificacionComponent } from './components/notificacion/notificacion.component';
import { NotificacionesServiceService } from './services/notificaciones-service.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    AppComponent,
    NotificacionComponent
  ],
  entryComponents: [
    NotificacionComponent
  ],
  imports: [
    HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
    NoopAnimationsModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    PersonasService,
    NotificacionesServiceService   
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
