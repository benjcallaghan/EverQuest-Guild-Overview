import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { PlanesOfProphecyPage } from './planes-of-prophecy.page';

describe('PlanesOfProphecyPage', () => {
  let component: PlanesOfProphecyPage;
  let fixture: ComponentFixture<PlanesOfProphecyPage>;

  beforeEach(async(() => {
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
