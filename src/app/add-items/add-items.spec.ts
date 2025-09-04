import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddItems } from './add-items';

describe('AddItems', () => {
  let component: AddItems;
  let fixture: ComponentFixture<AddItems>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddItems]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddItems);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
