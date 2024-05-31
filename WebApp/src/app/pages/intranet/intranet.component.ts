import { AfterViewInit, Component, OnInit } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { AppMenuItem, AppMenuModel } from '../../domain/menu/app-menu.model';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { LoadingComponent } from '../../shared/loading/loading.component';

@Component({
  selector: 'app-intranet',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterLink, CommonModule, LoadingComponent],
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss'
})
export class IntranetComponent implements OnInit {
  model: any[] = [];
  menuIntranet: AppMenuItem = AppMenuModel.menuIntranet;

  ngOnInit(): void {
  }

}
