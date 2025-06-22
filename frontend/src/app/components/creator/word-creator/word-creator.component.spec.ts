import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WordCreatorComponent } from './word-creator.component';

describe('WordCreatorComponent', () => {
  let component: WordCreatorComponent;
  let fixture: ComponentFixture<WordCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [WordCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(WordCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
