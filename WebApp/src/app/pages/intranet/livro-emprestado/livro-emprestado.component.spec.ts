import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LivroEmprestadoComponent } from './livro-emprestado.component';

describe('LivroEmprestadoComponent', () => {
  let component: LivroEmprestadoComponent;
  let fixture: ComponentFixture<LivroEmprestadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LivroEmprestadoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LivroEmprestadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
