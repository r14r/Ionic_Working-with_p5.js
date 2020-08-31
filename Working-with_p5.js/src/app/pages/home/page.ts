import { Component, ElementRef } from '@angular/core';

import { Toolbox } from 'src/app/helpers/toolbox';

import * as p5lib from 'p5';
import { timingSafeEqual } from 'crypto';

@Component({
	selector: 'app-home',
	templateUrl: 'page.html',
	styleUrls: ['page.scss'],
})
export class HomePage {
	private ID = 'HomePage';
	private toolbox = new Toolbox(this.ID);

	p5: any;
	p: any;
	width: number;
	height: number;

	backgroundColor: any;

	container: any;
	canvas: any;

	constructor(private el: ElementRef) {
		this.toolbox.log('constructor');
	}

	ionViewWillLeave() {
		this.toolbox.log('ionViewWillLeave');

		this.destroy();
	}

	ionViewDidEnter() {
		this.toolbox.log('ionViewDidEnter');

		this.init();
	}

	init() {
		this.toolbox.log('init');

		const p5 = new p5lib(p => {
			p.setup = () => { this.p5setup(p); };
			p.draw = () => { this.p5draw(p); };
		}, this.el.nativeElement);
	}

	destroy() {
		try {
			this.p.noLoop();
			this.p.remove();
			this.toolbox.log('destroy', 'noLoop and remove p=' + this.p);
		} catch (error) {
			this.toolbox.log('dstroy', 'error=' + error);
		}
	}

	p5setup(p) {
		this.toolbox.log('p5setup');

		this.p = p;

		this.backgroundColor = 10;

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.width = 1200;
		this.height = 400;

		const s = document.querySelector('#p5-container');
		s.innerHTML = '';

		console.table(s);
		s.setAttribute('width', this.width + '');
		s.setAttribute('height', this.height + '');

		const c = p.createCanvas(this.width, this.height).parent(s);
		this.toolbox.log('p5setup', 'parent=' + p + ' width=' + this.width + ' / height=' + this.height);

		this.draw(p);
	}


	p5draw(p) { }

	box(p, x, y, color) {
		this.toolbox.log('draw', 'draw rect size size ' + x + '/' + y + '/' + ' color=' + color);

		this.p.fill(color);

		// x, y, width, height, radius top-left, radius top-right, bottom-right, radius- bottom-left
		p.rect(x, x, 15, 15, 20, 15, 10, 5);
	}

	draw(p) {
		this.toolbox.log('draw', 'draw gray rect');
		p.fill('gray');
		p.rect(0, 0, this.width, this.height);

		this.box(p, 10, 20, 'red');
		this.box(p, 30, 20, 'blue');
		this.box(p, 50, 20, 'orange');
		this.box(p, 70, 20, 'yellow');
	}

	initAndDraw() {
		this.toolbox.log('initAndDraw');

		this.destroy();
		this.init();
		this.draw(this.p);
	}

	stepSelectDOM() {
		this.container = document.querySelector('#p5-container');

		this.toolbox.log('stepCreateCanvas', 'container=' + this.container);
	}

	stepCreateCanvas() {
		this.stepSelectDOM();

		this.p5 = new p5lib(p => {
			p.setup = () => { this.p5 = p; };
		}, this.el.nativeElement);

		this.canvas = this.p5.createCanvas(this.width, this.height).parent(this.container);
		this.toolbox.log('stepCreateCanvas', 'canvas=' + this.canvas + ' id=' + this.canvas.id);
	}
	stepRemoveCanvas() {
		const container = document.querySelector('#p5-container');

		this.toolbox.log('stepCreateCanvas', 'containers=');
		this.container.innerHTML = '';
	}

	stepP5Draw() {
		this.draw(this.p);
	}
	stepDestroy() {
		this.destroy();
	}
}
