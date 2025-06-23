import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordMiniSearchComponent } from './word-mini-search.component';

describe('WordMiniSearchComponent', () => {
  let component: WordMiniSearchComponent;
  let fixture: ComponentFixture<WordMiniSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordMiniSearchComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordMiniSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
