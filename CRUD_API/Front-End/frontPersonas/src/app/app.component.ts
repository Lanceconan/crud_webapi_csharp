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
  public personaPrueba: Personas;
  constructor(private personasService: PersonasService) { }

  ngOnInit() {
    this.personasService.getAllPersonas().subscribe(
      (personas: Personas[]) => {
        console.log(personas);
      }
    );

    this.personasService.getPersonaById('1').subscribe(
      (persona: Personas) => {
        this.personaPrueba = persona;
        console.log(this.personaPrueba);
        this.personaPrueba.apellidoMaterno = "RODRIGUEZ";

        this.personasService.updatePersona(this.personaPrueba).subscribe(
          data => {
            console.log('Prueba: ' + data);
          }
        );
      }
    );

    let personaNueva = new Personas();
    personaNueva.nombres = "ALGO NOMBRE";
    personaNueva.apellidoMaterno = "ALGOMATERNO";
    personaNueva.apellidoPaterno = "ALGOPATERNO";
    personaNueva.email = "algo@algo.cl";
    personaNueva.fechaNacimiento = new Date(1990, 1, 2);

    this.personasService.createPersona(personaNueva).subscribe(data => {console.log(data)});

    this.personasService.deletePersona('5').subscribe(data => { console.log(data); });




  }
}


