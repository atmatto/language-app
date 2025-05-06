import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordSimpleComponent } from './word-simple.component';

describe('WordSimpleComponent', () => {
  let component: WordSimpleComponent;
  let fixture: ComponentFixture<WordSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
