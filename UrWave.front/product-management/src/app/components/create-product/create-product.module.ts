import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ToastModule } from 'primeng/toast';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    // ToastModule  // Include ToastModule here ,
    RouterModule.forChild([{ path: 'create', component: CreateProductModule }])

  ]
})
export class CreateProductModule { }
