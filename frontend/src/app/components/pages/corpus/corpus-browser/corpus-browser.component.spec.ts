import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CorpusBrowserComponent } from './corpus-browser.component';

describe('CorpusBrowserComponent', () => {
  let component: CorpusBrowserComponent;
  let fixture: ComponentFixture<CorpusBrowserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CorpusBrowserComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CorpusBrowserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
