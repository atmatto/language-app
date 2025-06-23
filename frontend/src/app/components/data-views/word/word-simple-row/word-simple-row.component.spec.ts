import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSimpleRowComponent } from './word-simple-row.component';

describe('WordSimpleRowComponent', () => {
  let component: WordSimpleRowComponent;
  let fixture: ComponentFixture<WordSimpleRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSimpleRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSimpleRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
