import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-intranet',
  standalone: true,
  imports: [RouterOutlet, TranslateModule, RouterLink],
  templateUrl: './intranet.component.html',
  styleUrl: './intranet.component.scss'
})
export class IntranetComponent {

}
