import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageEditorComponent } from './language-editor.component';

describe('LanguageCreatorComponent', () => {
  let component: LanguageEditorComponent;
  let fixture: ComponentFixture<LanguageEditorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LanguageEditorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LanguageEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
