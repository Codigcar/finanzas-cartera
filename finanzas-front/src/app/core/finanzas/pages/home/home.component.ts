import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = [
    'id',
    'tea',
    'diasTranscurridos',
    'tasaEfectiva',
    'tasaDescontada',
    'descuento',
    'retencion',
    'costesIniciales',
    'valorNeto',
    'valorTotalRecibir',
    'costesFinales',
    'ValorTotalEntregar',
    'TCEA',
  ];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  private selectedPersonProfileId: number = 0;

  constructor(
    public dialog: MatDialog,
    private store: Store<IAppState>
  ) {}

  ngOnInit(): void {

    this.crearTabla([]);
    
    this.store.select('person').subscribe((resp) => {
      this.selectedPersonProfileId = resp.user?.id!;
    });
  }
  public crearTabla(data: any) {
    this.dataSource = new MatTableDataSource(data);
    this.dataSource.paginator = this.paginator;
  }

  public openDialogDelete(element: any) {
    Swal.fire({
      title: '¿Quieres cancelar la cita?',
      text: 'Puedes cancelar la cita con 1 dia de anticipación',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: '¡Si, quiero cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
       /*  this.citaService
          .deleteAppointment(element.id, this.selectedPersonProfileId)
          .subscribe(
            (resp: ICitaResponse[]) => {
              Swal.fire(
                '¡Cita Cancelada!',
                'Tu cita ha sido cancelada correctamente',
                'success'
              ).then(() => {
                this.crearTabla(resp);
              });
            },
            (err) => {
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                // text: err.error.mensaje,
              });
            }
          ); */
      }
    });
  }

}
