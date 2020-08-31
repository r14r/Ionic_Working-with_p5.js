import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { GetStartedPage } from './page';

describe('GetStartedPage', () => {
  let component: GetStartedPage;
  let fixture: ComponentFixture<GetStartedPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GetStartedPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(GetStartedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
