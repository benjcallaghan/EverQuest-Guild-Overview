import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { QuestIconComponent } from './quest-icon.component';

describe('QuestIconComponent', () => {
  let component: QuestIconComponent;
  let fixture: ComponentFixture<QuestIconComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuestIconComponent],
      imports: [IonicModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(QuestIconComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
