import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatSort, MatTableDataSource, MatSnackBar } from '@angular/material';
import { PersonasService } from './services/personas.service';
import { Personas } from './models/Personas';
import { NotificacionesServiceService } from './services/notificaciones-service.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Personas Buenas';
  public personaEditar: Personas = new Personas();
  public personaCrear: Personas = new Personas();

  displayedColumns: string[] = ['nombres', 'apellidoPaterno', 'apellidoMaterno', 'fechaNacimiento', 'email', 'opciones'];
  dataSource: MatTableDataSource<Personas>;

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  personaForm: FormGroup;

  public isEdit: boolean = false;

  constructor(
    private personasService: PersonasService,
    private notificacion: NotificacionesServiceService
  ) {

    this.personaForm = new FormGroup({
      nombres: new FormControl('', Validators.required),
      apellidoPaterno: new FormControl('', Validators.required),
      apellidoMaterno: new FormControl('', Validators.required),
      fechaNacimiento: new FormControl(new Date(), Validators.required),
      email: new FormControl(''),
      personaModel: new FormControl(''),
    });

  }

  ngOnInit() {

    this.getAllDataPersonas();

    // this.personasService.getPersonaById('1').subscribe(
    //   (persona: Personas) => {
    //     this.personaPrueba = persona;
    //     console.log(this.personaPrueba);
    //     this.personaPrueba.apellidoMaterno = "RODRIGUEZ";

    //     this.personasService.updatePersona(this.personaPrueba).subscribe(
    //       data => {
    //         console.log('Prueba: ' + data);
    //       }
    //     );
    //   }
    // );

    // let personaNueva = new Personas();
    // personaNueva.nombres = "ALGO NOMBRE";
    // personaNueva.apellidoMaterno = "ALGOMATERNO";
    // personaNueva.apellidoPaterno = "ALGOPATERNO";
    // personaNueva.email = "algo@algo.cl";
    // personaNueva.fechaNacimiento = new Date(1990, 1, 2);

    // this.personasService.createPersona(personaNueva).subscribe(data => {console.log(data)});

    // this.personasService.deletePersona('5').subscribe(data => { console.log(data); });

  }

  getAllDataPersonas() {
    this.personasService.getAllPersonas().subscribe(
      (personas: Personas[]) => {
        this.dataSource = new MatTableDataSource(personas);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      }
    );
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  editar(id: string) {
    this.personasService.getPersonaById(id).subscribe(
      (persona: Personas) => {
        this.isEdit = true;
        this.personaEditar = persona;
        this.cargarDatos();
        this.notificacion.openSnackBar('Se cargó en la vista: ' + persona.nombres.toLowerCase() + ' ' + persona.apellidoPaterno.toLowerCase() + ' para editar', 'success');
      },
      error => {
        this.notificacion.openSnackBar('NO Se cargó en la vista. Razon: ' + error.message + 'Código: ' + error.status, 'error');
      }
    );
  }

  saveEditar(){
    this.personaEditar.apellidoMaterno = this.personaForm.get('apellidoMaterno').value;
    this.personaEditar.apellidoPaterno = this.personaForm.get('apellidoPaterno').value;
    this.personaEditar.nombres = this.personaForm.get('nombres').value;
    this.personaEditar.email = this.personaForm.get('email').value;
    this.personaEditar.fechaNacimiento = this.personaForm.get('fechaNacimiento').value;

    this.personasService.updatePersona(this.personaEditar).subscribe(
      data => {   
        this.getAllDataPersonas();   
        this.cancelar();  
        this.isEdit = false;
        this.notificacion.openSnackBar('Se modificó la persona: ' + this.personaEditar.nombres.toLowerCase() + ' ' + this.personaEditar.apellidoPaterno.toLowerCase() + ' para editar', 'success');
      },
      error => {
        this.notificacion.openSnackBar('NO Se editó. Razon: ' + error.message + 'Código: ' + error.status, 'error');
      }
    );
  }

  createPersona(){
    this.personaCrear.apellidoMaterno = this.personaForm.get('apellidoMaterno').value;
    this.personaCrear.apellidoPaterno = this.personaForm.get('apellidoPaterno').value;
    this.personaCrear.nombres = this.personaForm.get('nombres').value;
    this.personaCrear.email = this.personaForm.get('email').value;
    this.personaCrear.fechaNacimiento = this.personaForm.get('fechaNacimiento').value;

    this.personasService.createPersona(this.personaCrear).subscribe(
      data => {        
        this.getAllDataPersonas();
        this.cancelar();
        this.notificacion.openSnackBar('Se creó una nueva persona: ' + data.nombres.toLowerCase() + ' ' + data.apellidoPaterno.toLowerCase() + ' para editar', 'success');
      },
      error => {
        this.notificacion.openSnackBar('NO Se editó. Razon: ' + error.message + 'Código: ' + error.status, 'error');
      }
    );

  }

  save(){
    if(this.isEdit){
      this.saveEditar()
    }
    else{
      this.createPersona();
    }    
  }

  cargarDatos() {
    if (this.personaEditar) {
      this.personaForm.get('nombres').setValue(this.personaEditar.nombres)
      this.personaForm.get('apellidoPaterno').setValue(this.personaEditar.apellidoPaterno)
      this.personaForm.get('apellidoMaterno').setValue(this.personaEditar.apellidoMaterno)
      this.personaForm.get('fechaNacimiento').setValue(this.personaEditar.fechaNacimiento)
      this.personaForm.get('email').setValue(this.personaEditar.email)
      this.personaForm.get('personaModel').setValue(this.personaEditar)
    } else {
      this.notificacion.openSnackBar('No existe una persona para ser cargada', 'warning')
    }
  }


  eliminar(id: string) {
    this.personasService.deletePersona(id).subscribe(
      (persona: Personas) => {
        this.getAllDataPersonas();
        this.notificacion.openSnackBar('Se ha eliminado a la persona: ' + persona.nombres.toLowerCase() + ' ' + persona.apellidoPaterno.toLowerCase(), 'success');
      },
      error => {
        this.notificacion.openSnackBar('NO Se eliminó a la persona. Razon: ' + error.message + 'Código: ' + error.status, 'error');
      }
    );
  }

  cancelar() {
    this.personaForm.get('nombres').reset()
    this.personaForm.get('apellidoPaterno').reset()
    this.personaForm.get('apellidoMaterno').reset()
    this.personaForm.get('fechaNacimiento').setValue(new Date());
    this.personaForm.get('email').reset()
    this.personaForm.get('personaModel').reset()

    this.personaEditar = new Personas();
  }


}


