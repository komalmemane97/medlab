import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MedicinesCategoryComponent } from './medicines-category.component';

describe('MedicinesCategoryComponent', () => {
  let component: MedicinesCategoryComponent;
  let fixture: ComponentFixture<MedicinesCategoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MedicinesCategoryComponent]
    });
    fixture = TestBed.createComponent(MedicinesCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
