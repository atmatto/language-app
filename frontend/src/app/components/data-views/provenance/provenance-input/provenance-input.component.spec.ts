import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProvenanceInputComponent } from './provenance-input.component';

describe('ProvenanceInputComponent', () => {
  let component: ProvenanceInputComponent;
  let fixture: ComponentFixture<ProvenanceInputComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProvenanceInputComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProvenanceInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
