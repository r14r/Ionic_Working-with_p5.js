import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FunctionPlotterPage } from './page';

const routes: Routes = [{ path: '', component: FunctionPlotterPage }];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FunctionPlotterPageRoutingModule { }
