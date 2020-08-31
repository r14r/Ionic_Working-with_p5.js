import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { FunctionPlotterPageRoutingModule } from './routing-module';
import { FunctionPlotterPage } from './page';

@NgModule({
	imports: [CommonModule, FormsModule, IonicModule, FunctionPlotterPageRoutingModule],
	declarations: [FunctionPlotterPage]
})
export class FunctionPlotterPageModule { }
