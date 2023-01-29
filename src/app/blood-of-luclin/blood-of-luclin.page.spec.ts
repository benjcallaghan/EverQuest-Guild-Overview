import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BloodOfLuclinPage } from './blood-of-luclin.page';

describe('BloodOfLuclinPage', () => {
  let component: BloodOfLuclinPage;
  let fixture: ComponentFixture<BloodOfLuclinPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [BloodOfLuclinPage],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(BloodOfLuclinPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
