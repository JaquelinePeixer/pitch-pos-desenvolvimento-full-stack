import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RenovacaoComponent } from './renovacao.component';

describe('RenovacaoComponent', () => {
  let component: RenovacaoComponent;
  let fixture: ComponentFixture<RenovacaoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RenovacaoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(RenovacaoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
