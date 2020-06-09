import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FilterGroceryPage } from './filter-grocery.page';

describe('FilterGroceryPage', () => {
  let component: FilterGroceryPage;
  let fixture: ComponentFixture<FilterGroceryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterGroceryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FilterGroceryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
