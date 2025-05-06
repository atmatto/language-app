import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainWordsTableComponent } from './main-words-table.component';

describe('MainWordsTableComponent', () => {
  let component: MainWordsTableComponent;
  let fixture: ComponentFixture<MainWordsTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainWordsTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainWordsTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
