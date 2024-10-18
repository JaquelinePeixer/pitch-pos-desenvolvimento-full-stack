import { Component } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { SharedModule } from '@shared/shared.module';
import { AccordionModule } from 'primeng/accordion';
import { AppMenuModel } from '@app/domain/menu/app-menu.model';
import { Obra } from '@app/service/obra/obra';
import { LoadingService } from '@app/shared/loading/loading.service';
import { ObraService } from '@app/service/obra/obra.service';
import { ToastErrorService } from '@app/service/toast-error/toast-error.service';
import { finalize } from 'rxjs';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-acervo-detalhamento',
  standalone: true,
  imports: [RouterLink, SharedModule, AccordionModule, TableModule],
  templateUrl: './acervo-detalhamento.component.html',
  styleUrl: './acervo-detalhamento.component.scss'
})
export class AcervoDetalhamentoComponent {
  tableDadosObra: Obra;
  contentBreadcrumb = [
    {
      title: 'acervo.title',
      action: AppMenuModel.menuAcervo.routerLink
    },
    {
      title: 'acervo-detalhamento.title',
      action: null
    }
  ];

  private id!: string;

  constructor(
    private activatedRoute: ActivatedRoute,
    private loadingService: LoadingService,
    private obraService: ObraService,
    private toastErrorService: ToastErrorService
  ) {
    this.id = this.activatedRoute.snapshot.params['id'];
    this.fetch();
  }

  fetch() {
    this.loadingService.startLoadind();
    this.obraService.getId(this.id)
      .pipe(finalize(() => this.loadingService.stopLoadind()))
      .subscribe({
        next: (result: Obra) => this.tableDadosObra = result,
        error: error => this.toastErrorService.alertError(error)
      })
  }

  referenciaBibliografica(): string {
    const autor = this.tableDadosObra.author?.name;
    const titulo = this.tableDadosObra.title;
    const ano = this.tableDadosObra.publicationYear;
    const edicao = this.tableDadosObra.edition;
    const cidade = this.tableDadosObra.publicationLocation;
    const paginas = this.tableDadosObra.pageQuantity;
    const editora = this.tableDadosObra.publisherName;

    return `${autor}. ${titulo}. ${edicao}. ${cidade}: ${editora}, ${new Date(ano).getFullYear()}. ${paginas} p.`;
  }

  localizacaoObra(): string {
    const location = this.tableDadosObra.location;
    return `Andar ${location.floor}, Seção ${location.section}, Estante ${location.bookcase}`;
  }
}