import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HazTuCitaComponent } from './haz-tu-cita.component';

describe('HazTuCitaComponent', () => {
  let component: HazTuCitaComponent;
  let fixture: ComponentFixture<HazTuCitaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HazTuCitaComponent]
    });
    fixture = TestBed.createComponent(HazTuCitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
