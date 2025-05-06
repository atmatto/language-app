import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceRowComponent } from './sentence-row.component';

describe('SentenceRowComponent', () => {
  let component: SentenceRowComponent;
  let fixture: ComponentFixture<SentenceRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
