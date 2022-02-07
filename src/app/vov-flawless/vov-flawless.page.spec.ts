import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { VovFlawlessPage } from './vov-flawless.page';

describe('VovFlawlessPage', () => {
  let component: VovFlawlessPage;
  let fixture: ComponentFixture<VovFlawlessPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VovFlawlessPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(VovFlawlessPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
