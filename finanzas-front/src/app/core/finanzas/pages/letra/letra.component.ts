import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-letra',
  templateUrl: './letra.component.html',
  styleUrls: ['./letra.component.scss']
})
export class LetraComponent implements OnInit {

  title1:any = "Fecha de Giro";
  title2:any = "Fecha de Vencimiento";
  title3:any = "Total Valor Nominal";

  constructor() { }

  ngOnInit(): void {
  }

}
