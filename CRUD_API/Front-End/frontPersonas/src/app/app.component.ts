import { Component } from '@angular/core';
import { PersonasService } from './services/personas.service';
import { Personas } from './models/Personas';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'frontPersonas';

  constructor(private personasService: PersonasService) { }

  ngOnInit() {
    this.personasService.getAllPersonas().subscribe(
      (personas: Personas[]) => {
        console.log(Personas);
      }
    );
  }
}


