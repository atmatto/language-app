import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageRowComponent } from './language-row.component';

describe('LanguageRowComponent', () => {
  let component: LanguageRowComponent;
  let fixture: ComponentFixture<LanguageRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageRowComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
