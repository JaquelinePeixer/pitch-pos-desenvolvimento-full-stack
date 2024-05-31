import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppFilterComponent } from './filter.component';

describe('AppFilterComponent', () => {
  let component: AppFilterComponent;
  let fixture: ComponentFixture<AppFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppFilterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AppFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
