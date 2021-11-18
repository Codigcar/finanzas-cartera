import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
})
export class TableComponent implements OnInit {
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'valor'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;




  constructor(public dialog: MatDialog, private store: Store<IAppState>) {}


  ngOnInit(): void {
    this.crearTabla([
      {id:1 ,name: 'name', valor: 'valor' },
      {id:2 ,name: 'name', valor: 'valor' },
      {id:3 ,name: 'name', valor: 'valor' },
      {id:4 ,name: 'name', valor: 'valor' },
      {id:5 ,name: 'name', valor: 'valor' },
      {id:6 ,name: 'name', valor: 'valor' },
    ]);
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
