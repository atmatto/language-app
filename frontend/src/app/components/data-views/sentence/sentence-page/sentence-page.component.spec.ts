import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentencePageComponent } from './sentence-page.component';

describe('SentencePageComponent', () => {
  let component: SentencePageComponent;
  let fixture: ComponentFixture<SentencePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentencePageComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
