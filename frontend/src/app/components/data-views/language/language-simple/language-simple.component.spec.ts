import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageSimpleComponent } from './language-simple.component';

describe('LanguageSimpleComponent', () => {
  let component: LanguageSimpleComponent;
  let fixture: ComponentFixture<LanguageSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
