import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { AppMenuItem, AppMenuModel } from '../../domain/menu/app-menu.model';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { ToastModule } from 'primeng/toast';

@Component({
  selector: 'app-intranet',
  standalone: true,
  imports: [RouterOutlet, RouterLink, CommonModule, SharedModule, ToastModule],
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss'
})
export class IntranetComponent {
  model: any[] = [];
  menuIntranet: AppMenuItem = AppMenuModel.menuIntranet;
}
