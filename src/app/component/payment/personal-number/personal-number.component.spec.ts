import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonalNumberComponent } from './personal-number.component';

describe('PersonalNumberComponent', () => {
  let component: PersonalNumberComponent;
  let fixture: ComponentFixture<PersonalNumberComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PersonalNumberComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonalNumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
