import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanesOfProphecyPage } from './planes-of-prophecy.page';

describe('PlanesOfProphecyPage', () => {
  let component: PlanesOfProphecyPage;
  let fixture: ComponentFixture<PlanesOfProphecyPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ PlanesOfProphecyPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(PlanesOfProphecyPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
