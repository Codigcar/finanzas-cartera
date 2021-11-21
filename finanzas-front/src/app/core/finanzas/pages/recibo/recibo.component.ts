import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-recibo',
  templateUrl: './recibo.component.html',
  styleUrls: ['./recibo.component.scss']
})
export class ReciboComponent implements OnInit {

  title1:any = "Fecha de Emision";
  title2:any = "Fecha de Pago";
  title3:any = "Total a Recibir";


  constructor() { }

  ngOnInit(): void {
  }

}
