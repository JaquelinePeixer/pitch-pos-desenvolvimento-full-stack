import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [TranslateModule, RouterLink],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  usuario = 'Usuario';

  logout(){
    console.log('logout');
  }
}
