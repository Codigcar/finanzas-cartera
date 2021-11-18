import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { IFacturaRequest } from '../interface/honorary.interface';

@Injectable({
  providedIn: 'root'
})
export class FacturaService {

  private url_base: string = environment.URI_BASE;

  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  createFactura(form: IFacturaRequest){
    this.http.post(`${this.url_base}/honoraries`,form).subscribe(resp => {
      console.log('respuesta: ',resp);
      
    })
  }
}
