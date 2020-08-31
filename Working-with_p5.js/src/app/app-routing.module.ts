import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
	{ path: '', redirectTo: 'home', pathMatch: 'full' },
	{ path: 'home', loadChildren: () => import('./pages/home/module').then(m => m.HomePageModule) },
	{ path: 'getstarted', loadChildren: () => import('./pages/getstarted/module').then(m => m.GetStartedPageModule) },
	{ path: 'function-plotter', loadChildren: () => import('./pages/math/function-plotter/module').then(m => m.FunctionPlotterPageModule) },
];

@NgModule({
	imports: [
		RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
	],
	exports: [RouterModule]
})
export class AppRoutingModule { }
