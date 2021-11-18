import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import Swal from 'sweetalert2';
import { IAppState } from 'src/app/app.reducer';
import { Store } from '@ngrx/store';
import * as moment from 'moment';
import { FacturaService } from '../../services/factura.service';

@Component({
  selector: 'app-factura',
  templateUrl: './factura.component.html',
  styleUrls: ['./factura.component.scss'],
})
export class FacturaComponent implements OnInit {
  public form!: FormGroup;
  dataSourceLeft!: MatTableDataSource<any>;
  dataSourceRight!: MatTableDataSource<any>;
  @ViewChild(MatPaginator) paginatorLeft!: MatPaginator;
  @ViewChild(MatPaginator) paginatorRight!: MatPaginator;
  public selectedEfectiva:boolean = true;

  public selectedDiasxAnio: number = 1;
  public selectedPlazoDeTasa: number = 7;
  public selectedMotivoCyGIniciales: any = 'Portes';
  public selectedMotivoCyGFinales: any = 'Portes';
  public selectedEfectivoOPorcentaje: number = 0;
  public sumaTotalCostosIniciales: number = 0;
  public sumaTotalCostosFinales: number = 0;

  displayedColumnsLeft: string[] = ['name', 'valor'];
  displayedColumnsRight: string[] = ['name', 'valor'];

  public listDiasxAnio: any[] = [
    { id: 365, name: '365 dias' },
    { id: 360, name: '360 dias' },
  ];
  public listPlazoDeTasa: any[] = [
    { id: 0, name: 'Diario', valor: 1 },
    { id: 1, name: 'Quincenal', valor: 15 },
    { id: 2, name: 'Mensual', valor: 30 },
    { id: 3, name: 'Bimestral', valor: 60 },
    { id: 4, name: 'Trimestral', valor: 90 },
    { id: 5, name: 'Cuatrimestral', valor: 120 },
    { id: 6, name: 'Semestral', valor: 180 },
    { id: 7, name: 'Anual', valor: 360 },
    { id: 8, name: 'Especial', valor: 0 },
  ];

  public listMotivosCyCI: any[] = [
    { id: 0, name: 'Portes' },
    { id: 1, name: 'Fotocopias' },
    { id: 2, name: 'Comisión de estudio' },
    { id: 3, name: 'Comisión de desembolso' },
    { id: 4, name: 'Comisión de intermediación' },
    { id: 5, name: 'Gastos de administración' },
    { id: 6, name: 'Gastos notariales' },
    { id: 7, name: 'Seguro' },
    { id: 8, name: 'Otros gastos' },
  ];

  public listValorExpresado: any[] = [
    { id: 0, name: 'En Efectivo' },
    { id: 1, name: 'En Porcentaje' },
  ];

  public listCostesyGastosIniciales: any[] = [];
  public listCostesyGastosFinales: any[] = [];

  constructor(
    private fb: FormBuilder,
    private facturaService: FacturaService
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: [''],
      fecha: [''],
      fechaDeEmision: [new Date()],
      fechaDePago: [''],
      totalFacturado: [''],
      retencion: [''],
      //selectores
      diasXanio: [''],
      plazoDeTasa: [
        {
          value: this.listPlazoDeTasa[this.selectedPlazoDeTasa].valor,
          disabled: true,
        },
      ],
      //
      tasaEfectiva: [''],
      fechaDescuento: [''],

      //CyGI
      cygI: [''],
      valorTemp1: [''],
      valorTemp2: [''],

      //nominal
      tasaNominal:[''],
      periodoCapital:['']
    });
  }

  public selectOpt(opt: any) {}

  public selectPlazoTasa(opt: any) {
    const listId: number = opt.source.value;
    if (listId === 8) {
      this.form.controls['plazoDeTasa'].setValue(
        this.listPlazoDeTasa[listId].valor
      );
      this.form.controls['plazoDeTasa'].enable();
    } else {
      this.form.controls['plazoDeTasa'].disable();
      this.form.controls['plazoDeTasa'].setValue(
        this.listPlazoDeTasa[listId].valor
      );
    }
  }

  public selectCyGI(opt: any) {}

  /* Table */
  public crearTablaLeft(data: any) {
    this.dataSourceLeft = new MatTableDataSource(data);
    this.dataSourceLeft.paginator = this.paginatorLeft;
  }

  public crearTablaRight(data: any) {
    this.dataSourceRight = new MatTableDataSource(data);
    this.dataSourceRight.paginator = this.paginatorRight;
  }

  public agregarCostosIniciales() {
    this.listCostesyGastosIniciales.push({
      name: this.selectedMotivoCyGIniciales,
      valor: this.form.value.valorTemp1,
    });

    this.form.controls['valorTemp1'].setValue('0');
    this.crearTablaLeft(this.listCostesyGastosIniciales);
  }

  public agregarCostosFinales() {
    this.listCostesyGastosFinales.push({
      name: this.selectedMotivoCyGFinales,
      valor: this.form.value.valorTemp2,
    });

    this.form.controls['valorTemp2'].setValue('0');

    this.crearTablaRight(this.listCostesyGastosFinales);
  }

  public submit() {
    // console.log('this.listCostesyGastosIniciales: ',this.listCostesyGastosIniciales);
    console.log('submit');

    if (this.listCostesyGastosIniciales.length !== 0) {
      this.listCostesyGastosIniciales.map((item) => {
        this.sumaTotalCostosIniciales += Number(item.valor);
      });
    }

    if (this.listCostesyGastosFinales.length !== 0) {
      this.listCostesyGastosFinales.map((item) => {
        this.sumaTotalCostosFinales += Number(item.valor);
      });
    }

    const fechaDePagoFormat = moment(this.form.value.fechaDePago).format(
      'YYYY-MM-DD'
    );
    const fechaDeEmisionFormat = moment(this.form.value.fechaDeEmision).format(
      'YYYY-MM-DD'
    );
    const fechaDeDescuentoFormat = moment(
      this.form.value.fechaDescuento
    ).format('YYYY-MM-DD');

    const fechaDePagoFormat22 = moment(fechaDePagoFormat + '');
    const fechaDeEmisionFormat11 = moment(fechaDeEmisionFormat + '');
    const fechaDeDescuentoFormat33 = moment(fechaDeDescuentoFormat + '');

    const diasTrancurrido = Math.abs(
      fechaDeDescuentoFormat33.diff(fechaDePagoFormat22, 'days')
    );
    /* console.log('this.form.value.plazoDeTasa: ',this.form.controls['plazoDeTasa'].value);
    console.log('this.selectedDiasxAnio: ',this.selectedDiasxAnio); */

    this.facturaService.createFactura({
      fechaEmision: fechaDeEmisionFormat,
      fechaPago: fechaDePagoFormat,
      diasTranscurridos: diasTrancurrido,
      totalRecibir: this.form.value.totalFacturado,
      retencion: this.form.value.retencion,
      diasxAnio: this.selectedDiasxAnio,
      plazoTaza: this.form.controls['plazoDeTasa'].value,
      tasaEfectiva: this.form.value.tasaEfectiva,
      fechaDescuent: fechaDeDescuentoFormat,
      CyGI: this.sumaTotalCostosIniciales,
      CyGF: this.sumaTotalCostosFinales,
      periodoCapital: '',
      tasaNominal: '',
      accountId: 1,
    });
  }
}
