import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AddGroceryPage } from './add-grocery.page';

describe('AddGroceryPage', () => {
  let component: AddGroceryPage;
  let fixture: ComponentFixture<AddGroceryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AddGroceryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AddGroceryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
