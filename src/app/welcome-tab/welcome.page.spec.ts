import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import { WelcomeTabPage } from './welcome.page';

describe('WelcomeTabPage', () => {
  let component: WelcomeTabPage;
  let fixture: ComponentFixture<WelcomeTabPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [WelcomeTabPage],
      imports: [IonicModule.forRoot(), ExploreContainerComponentModule]
    }).compileComponents();

    fixture = TestBed.createComponent(WelcomeTabPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
