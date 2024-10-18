import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcervoDetalhamentoComponent } from './acervo-detalhamento.component';


describe('AcervoDetalhamentoComponent', () => {
  let component: AcervoDetalhamentoComponent;
  let fixture: ComponentFixture<AcervoDetalhamentoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AcervoDetalhamentoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AcervoDetalhamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
