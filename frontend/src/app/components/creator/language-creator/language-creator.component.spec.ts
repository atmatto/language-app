import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageCreatorComponent } from './language-creator.component';

describe('LanguageCreatorComponent', () => {
  let component: LanguageCreatorComponent;
  let fixture: ComponentFixture<LanguageCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageCreatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
