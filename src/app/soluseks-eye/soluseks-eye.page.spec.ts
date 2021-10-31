import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { SoluseksEyePage } from './soluseks-eye.page';

describe('SoluseksEyePage', () => {
  let component: SoluseksEyePage;
  let fixture: ComponentFixture<SoluseksEyePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SoluseksEyePage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(SoluseksEyePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
