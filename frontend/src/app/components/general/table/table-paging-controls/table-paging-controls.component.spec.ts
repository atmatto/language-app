import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TablePagingControlsComponent } from './table-paging-controls.component';

describe('TablePagingControlsComponent', () => {
  let component: TablePagingControlsComponent;
  let fixture: ComponentFixture<TablePagingControlsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TablePagingControlsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TablePagingControlsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
