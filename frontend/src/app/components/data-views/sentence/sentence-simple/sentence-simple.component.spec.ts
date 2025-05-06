import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentenceSimpleComponent } from './sentence-simple.component';

describe('SentenceSimpleComponent', () => {
  let component: SentenceSimpleComponent;
  let fixture: ComponentFixture<SentenceSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SentenceSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentenceSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
