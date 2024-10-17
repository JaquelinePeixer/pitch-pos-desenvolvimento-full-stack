import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AcervoComponent } from './list/acervo.component';
import { AcervoDetalhamentoComponent } from '../acervo-detalhamento/acervo-detalhamento.component';

const routes: Routes = [
  {
    path: '',
    component: AcervoComponent,
    pathMatch: 'full'
  },
  {
    path: 'view/:id',
    component: AcervoDetalhamentoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AcervoRoutingModule { }
