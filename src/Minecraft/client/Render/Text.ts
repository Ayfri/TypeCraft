import p5 from 'p5';

export class Text {
	constructor(public p: p5, public text: string, public xRelative: number, public yRelative: number) {
	
	}
	
	render() {
		this.p.text(this.text, -this.p.width / 2 + this.xRelative, this.p.height / 2 - this.yRelative);
	}
}