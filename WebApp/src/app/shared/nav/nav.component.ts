import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { MenuModule } from 'primeng/menu';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, RouterLink, MenuModule, ButtonModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  usuario = 'Usuario';

  logout() {
    console.log('logout');
  }
}
