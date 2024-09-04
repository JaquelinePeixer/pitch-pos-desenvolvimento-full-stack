import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntranetComponent } from './intranet.component';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ToastModule } from 'primeng/toast';
import { IntranetRoutingModule } from './intranet-routing.module';
import { SharedModule } from '../../shared/shared.module';


@NgModule({
  declarations: [IntranetComponent],
  imports: [
    RouterOutlet, 
    RouterLink, 
    CommonModule, 
    SharedModule, 
    ToastModule, 
    IntranetRoutingModule
  ]
})
export class IntranetModule { }
