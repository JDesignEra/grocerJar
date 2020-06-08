import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EditGroceryPage } from './edit-grocery.page';

describe('EditGroceryPage', () => {
  let component: EditGroceryPage;
  let fixture: ComponentFixture<EditGroceryPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditGroceryPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EditGroceryPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
