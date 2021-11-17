import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LetraComponent } from './pages/letra/letra.component';
import { FacturaComponent } from './pages/factura/factura.component';
import { ReciboComponent } from './pages/recibo/recibo.component';
import { ComponentsModule } from 'src/app/shared/components/components.module';
import { MaterialModule } from 'src/app/material/material.module';
import { InputTextComponent } from './components/input-text/input-text.component';
import { HomeComponent } from './pages/home/home.component';



@NgModule({
  declarations: [
    LetraComponent,
    FacturaComponent,
    ReciboComponent,
    InputTextComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    ComponentsModule,
    MaterialModule
  ],
  exports:[
    LetraComponent,
    FacturaComponent,
    ReciboComponent
  ]
})
export class FinanzasModule { }
