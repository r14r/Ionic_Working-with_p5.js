import { Component, ElementRef, ViewEncapsulation } from '@angular/core';

import { Toolbox } from 'src/app/helpers/toolbox';

import * as p5 from 'p5';

@Component({
	selector: 'app',
	templateUrl: 'page.html',
	styleUrls: ['page.scss'],
	encapsulation: ViewEncapsulation.None
})
export class GetStartedPage {
	private ID = 'GetStartedPage';
	private toolbox = new Toolbox(this.ID);

	p: any;
	width: number;
	height: number;

	constructor(private el: ElementRef) {
		this.toolbox.log('constructor');
	}

	ionViewWillEnter() {
		this.toolbox.log('ionViewWillEnter');
	}

	ionViewWillLeave() {
		this.toolbox.log('ionViewWillLeave');

		this.destroy();
	}

	ionViewDidEnter() {
		this.toolbox.log('ionViewDidEnter');

		this.init();
	}
	ionViewDidLeave() {
		this.toolbox.log('ionViewDidLeave');
	}

	init() {
		this.toolbox.log('init');

		const p5obj = new p5(p => {
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

		this.width = window.innerWidth;
		this.height = window.innerHeight;

		this.width = 800;
		this.height = 600;

		const s = document.querySelector('#p5-container');
		const c = p.createCanvas(this.width, this.height);
		this.toolbox.log('p5setup', 'createCanvas');
		console.table(c);

		this.toolbox.log('p5setup', 'set background to white');
		p.background('white');

		this.toolbox.log('p5setup', 'draw gray rect');
		p.fill('gray');
		p.rect(0, 0, this.width, this.height);

		this.toolbox.log('p5setup', 'done');
	}

	polygon(p, x, y, radius, npoints, color) {
		const angle = p.TWO_PI / npoints;
		p.beginShape();

		p.fill(color);
		for (let a = 0; a < p.TWO_PI; a += angle) {
			const sx = x + Math.cos(a) * radius;
			const sy = y + Math.sin(a) * radius;
			p.vertex(sx, sy);
		}
		p.endShape(p.CLOSE);
	}

	draw_figure(p, scaleX, scaleY, divisor, radius, npoints, color) {
		p.push();
		p.translate(this.width * scaleX, this.height * scaleY);
		p.rotate(p.frameCount / divisor);
		this.polygon(p, 0, 0, radius, npoints, color);
		p.pop();
	}

	p5draw(p) {
		this.draw_figure(p, 0.2, 0.5, 200.0, 82, 3, 'red');
		this.draw_figure(p, 0.5, 0.5, 50.0, 80, 20, 'blue');
		this.draw_figure(p, 0.8, 0.5, -100.0, 70, 7, 'green');
	}

	draw(p) {
		this.p5draw(this.p);
	}


	initAndDraw() {
		this.toolbox.log('initAndDraw');

		this.destroy();
		this.init();
		this.draw(this.p);
	}
}
