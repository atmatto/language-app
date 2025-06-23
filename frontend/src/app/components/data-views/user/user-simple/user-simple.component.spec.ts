import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserSimpleComponent } from './user-simple.component';

describe('UserSimpleComponent', () => {
  let component: UserSimpleComponent;
  let fixture: ComponentFixture<UserSimpleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserSimpleComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserSimpleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
