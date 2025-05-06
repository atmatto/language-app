import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainSentencesTableComponent } from './main-sentences-table.component';

describe('MainSentencesTableComponent', () => {
  let component: MainSentencesTableComponent;
  let fixture: ComponentFixture<MainSentencesTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainSentencesTableComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainSentencesTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
