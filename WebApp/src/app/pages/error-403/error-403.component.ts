import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';

@Component({
  selector: 'app-error-403',
  standalone: true,
  imports: [RouterLink, SharedModule],
  templateUrl: './error-403.component.html',
  styleUrl: './error-403.component.scss'
})
export class Error403Component {

}
