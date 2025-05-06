import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordRowComponent } from './word-row.component';

describe('WordRowComponent', () => {
  let component: WordRowComponent;
  let fixture: ComponentFixture<WordRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
