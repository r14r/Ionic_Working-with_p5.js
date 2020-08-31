import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FunctionPlotterPage } from './page';

describe('FunctionPlotterPage', () => {
	let component: FunctionPlotterPage;
	let fixture: ComponentFixture<FunctionPlotterPage>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [FunctionPlotterPage],
			imports: [IonicModule.forRoot()]
		}).compileComponents();

		fixture = TestBed.createComponent(FunctionPlotterPage);
		component = fixture.componentInstance;
		fixture.detectChanges();
	}));

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
