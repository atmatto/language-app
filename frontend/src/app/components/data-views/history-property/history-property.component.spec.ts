import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HistoryPropertyComponent } from './history-property.component';

describe('HistoryPropertyComponent', () => {
  let component: HistoryPropertyComponent;
  let fixture: ComponentFixture<HistoryPropertyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HistoryPropertyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HistoryPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
