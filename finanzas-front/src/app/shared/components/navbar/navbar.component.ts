import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { IAppState } from 'src/app/app.reducer';

interface MenuItem {
  ruta: string;
  text: string;
  icon: string;
}

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  public menu: MenuItem[] = [];

  constructor(private router: Router, private store: Store<IAppState>) {}

  ngOnInit(): void {
    this.store.select("ui").subscribe(resp => {
        this.menu = [
          { ruta: '/personProfiles/letras', text: 'Letra', icon: '' },
          { ruta: '/personProfiles/facturas', text: 'Factura', icon: '' },
          { ruta: '/personProfiles/recibos', text: 'Recibo', icon: '' },
          { ruta: '/auth/login', text: 'Cerrar sesión', icon: 'logout' },
        ];
    })
  }
}
