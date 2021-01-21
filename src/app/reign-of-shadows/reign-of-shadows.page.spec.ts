import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ReignOfShadowsPage } from './reign-of-shadows.page';

describe('ReignOfShadowsPage', () => {
  let component: ReignOfShadowsPage;
  let fixture: ComponentFixture<ReignOfShadowsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReignOfShadowsPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ReignOfShadowsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
