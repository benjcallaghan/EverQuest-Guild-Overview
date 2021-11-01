import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RosFlawlessPage } from './ros-flawless.page';

describe('RosFlawlessPage', () => {
  let component: RosFlawlessPage;
  let fixture: ComponentFixture<RosFlawlessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RosFlawlessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(RosFlawlessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
