import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencesTableComponent } from './sentences-table.component';

describe('SentencesTableComponent', () => {
  let component: SentencesTableComponent;
  let fixture: ComponentFixture<SentencesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentencesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentencesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
