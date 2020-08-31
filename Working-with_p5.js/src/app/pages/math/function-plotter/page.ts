import { Component, OnInit, OnDestroy } from '@angular/core';

import { Toolbox } from 'src/app/helpers/toolbox';

import * as p5 from 'p5';

@Component({
	selector: 'app-function-plotter',
	templateUrl: './page.html',
	styleUrls: ['./page.scss'],
})
export class FunctionPlotterPage implements OnInit, OnDestroy {
	private ID = 'FunctionPlotterPage';
	private toolbox = new Toolbox(this.ID);

	p: any;

	curve: any;
	width: number;
	height: number;

	margin = { top: 100, bottom: 100, left: 100, right: 100 };

	fscale = 24; // a scale factor

	backgroundColour: any;
	nodeColour = '#666600';
	nodeSize = 2;

	xMin = -9;
	xMax = 9;
	yMin = -9;
	yMax = 9;

	dx = 0.2; // x distance between nodes
	dy = 0.2; // y distance between nodes

	nodes;
	axes;

	constructor() {
		this.toolbox.log('constructor');
	}

	ngOnInit() {
		this.toolbox.log('ngOnInit');

		const p5obj = new p5(p => {
			p.setup = () => { this.p5setup(p); };
			p.draw = () => { this.p5draw(p); };
			p.mouseDragged = () => { this.p5mouseDragged(p); };
			p.touchMoved = () => { this.p5touchMoved(p); };
		});
	}

	ngOnDestroy() {
		try {
			this.toolbox.log('ngOnDestroy');

			this.p.noLoop();
			this.p.remove();
		} catch (error) {
			this.toolbox.log('ngDestroy', 'error=' + error);
		}
	}

	ionViewWillEnter() {
		this.toolbox.log('ionViewWillEnter');
	}
	ionViewDidEnter() {
		this.toolbox.log('ionViewDidEnter');
	}
	ionViewWillLeave() {
		this.toolbox.log('ionViewWillLeave');
	}
	ionViewDidLeave() {
		this.toolbox.log('ionViewDidLeave');
	}

	p5setup(p) {
		this.toolbox.log('p5setup');

		this.p = p;

		this.width = window.innerWidth;
		this.height = window.innerHeight;
		this.toolbox.log('setup', 'width=' + this.width + ' / height=' + this.height);

		this.backgroundColour = p.color(255, 255, 255);

		const c = document.querySelector('#p5-container');
		p
			.createCanvas(this.width, this.height)
			.parent(c);

		this.makeFunctionNodes();
	}

	f(x, y) {
		return (5 * Math.sin(Math.sqrt(x * x + y * y))) / (Math.sqrt(x * x + y * y));
	}

	windowResized(p) {
		this.toolbox.log('windowResized');

		this.width = p5.windowWidth;
		this.height = p5.windowHeight;
		p.resizeCanvas(this.width, this.height);
		// makeFunctionNodes();
	}

	functionNodesConstructor() {
		this.toolbox.log('functionNodesConstructor');

		// filling the nodes array with function points [x,y,z] where z = f(x,y).
		let i = 0;
		this.nodes = new Array();
		for (let x = this.xMin; x <= this.xMax; x += this.dx) {
			for (let y = this.yMin; y <= this.yMax; y += this.dy) {
				this.nodes[i] = [x, y, this.f(x, y)];
				++i;
			}
		}
	}

	makeFunctionNodes() {
		this.toolbox.log('makeFunctionNodes');

		this.functionNodesConstructor();

		this.axes = [[0, 0, 0], [this.xMax, 0, 0], [0, this.yMax, 0], [0, 0, this.xMax]];

		this.rotateX3D(295 * Math.PI / 180);
		this.rotateY3D(30 * Math.PI / 180);
		this.rotateZ3D(30 * Math.PI / 180);

	}

	rotateZ3D(theta) {
		this.toolbox.log('rotateZ3D');

		// if (window.console && window.console.log) { console.log("rotZ="+theta) }
		const sinTheta = Math.sin(theta);
		const cosTheta = Math.cos(theta);

		for (const node of this.nodes) {
			const x = node[0];
			const y = node[1];
			node[0] = x * cosTheta - y * sinTheta;
			node[1] = y * cosTheta + x * sinTheta;
		}

		for (const node of this.axes) {
			const x = node[0];
			const y = node[1];
			node[0] = x * cosTheta - y * sinTheta;
			node[1] = y * cosTheta + x * sinTheta;
		}
	}

	rotateY3D(theta) {
		this.toolbox.log('rotateY3D');

		// if (window.console && window.console.log) { console.log("rotY="+theta) }
		const sinTheta = Math.sin(-theta);
		const cosTheta = Math.cos(-theta);

		for (const node of this.nodes) {
			const x = node[0];
			const z = node[2];
			node[0] = x * cosTheta - z * sinTheta;
			node[2] = z * cosTheta + x * sinTheta;
		}

		for (const node of this.axes) {
			const x = node[0];
			const z = node[2];
			node[0] = x * cosTheta - z * sinTheta;
			node[2] = z * cosTheta + x * sinTheta;
		}
	}

	rotateX3D(theta) {
		this.toolbox.log('rotateX3D');

		// if (window.console && window.console.log) { console.log("rotX="+theta) }
		const sinTheta = Math.sin(-theta);
		const cosTheta = Math.cos(-theta);

		for (const node of this.nodes) {
			const y = node[1];
			const z = node[2];
			node[1] = y * cosTheta - z * sinTheta;
			node[2] = z * cosTheta + y * sinTheta;
		}

		for (const node of this.axes) {
			const y = node[1];
			const z = node[2];
			node[1] = y * cosTheta - z * sinTheta;
			node[2] = z * cosTheta + y * sinTheta;
		}
	}

	p5draw(p) {
		p.background(this.backgroundColour);
		p.translate(this.width / 2, this.height / 2);

		// this.toolbox.log('draw', 'position to center = ' + this.width / 2 + '/' + this.height / 2);

		// Draw nodes
		p.fill(this.nodeColour);
		p.noStroke();

		for (const node of this.nodes) {
			const px = node[0];
			const py = node[1];

			p.rect(px * this.fscale, py * this.fscale, this.nodeSize, this.nodeSize);
		}

		// Draw axes
		p.stroke('gray');
		p.fill('gray');
		p.textSize(16);

		p.line(this.axes[0][0] * this.fscale, this.axes[0][1] * this.fscale, this.axes[1][0] * this.fscale, this.axes[1][1] * this.fscale);
		p.text('x', this.axes[1][0] * this.fscale, this.axes[1][1] * this.fscale);
		p.line(this.axes[0][0] * this.fscale, this.axes[0][1] * this.fscale, this.axes[2][0] * this.fscale, this.axes[2][1] * this.fscale);
		p.text('y', this.axes[2][0] * this.fscale, this.axes[2][1] * this.fscale);
		p.line(this.axes[0][0] * this.fscale, this.axes[0][1] * this.fscale, this.axes[3][0] * this.fscale, this.axes[3][1] * this.fscale);
		p.text('z', this.axes[3][0] * this.fscale, this.axes[3][1] * this.fscale);

	}

	p5mouseDragged(p) {
		this.rotateY3D((p.mouseX - p.pmouseX) * Math.PI / 180);
		this.rotateX3D((p.mouseY - p.pmouseY) * Math.PI / 180);
	}

	p5touchMoved(p) {
		this.rotateY3D((p.mouseX - p.pmouseX) * Math.PI / 180);
		this.rotateX3D((p.mouseY - p.pmouseY) * Math.PI / 180);

		return false;
	}


}
