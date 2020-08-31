import { Injectable } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class Toolbox {
	private PREFIX = 'Toolbox';

	constructor(prefix: string) {
		this.PREFIX = prefix;
	}

	log(func, line = '') {
		console.log(this.PREFIX + '|' + func + ':: ' + line);
	}

	display_object(o) {
		let result = '';
		for (const p of o) {
			result += p + ': ' + o[p] + '; ';
		}

		return result;
	}

	getNodeTree(node) {
		let children = [];

		if (node.hasChildNodes()) {
			children = [];

			for (const child of node.childNodes) {
				children.push(this.getNodeTree(node));
			}

			const result = {
				nodeName: node.nodeName,
				parentName: node.parentNode.nodeName,
				children,
				content: node.innerText || ''
			};
			this.log('getNdeTree');
			console.table(result);

			return result;
		}

		return {};
	}
}
