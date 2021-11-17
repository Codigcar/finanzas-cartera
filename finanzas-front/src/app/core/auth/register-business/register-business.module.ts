import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterBusinessComponent } from './pages/register-business/register-business.component';
import { MaterialModule } from 'src/app/material/material.module';



@NgModule({
  declarations: [
    RegisterBusinessComponent 
  ],
  exports:[
    RegisterBusinessComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
  ],
})
export class RegisterBusinessModule { }
