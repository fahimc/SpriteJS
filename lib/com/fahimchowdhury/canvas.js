var Canvas = {
	vml : {
		NS : "urn:schemas-microsoft-com:vml"
	},
	svg : {
		NS : 'http://www.w3.org/2000/svg'
	},
	stage : null,
	group : null,
	beginFill : function(obj) {
		if(this.stage)return;
		if (!this.supportsSvg()) {
			document.namespaces.add("v", this.vml.NS, "#default#VML");
			this.stage = document.createElement('div');
			
			 // this.stage.appendChild(this.group);
			// if (!this.group) {
				// this.group = document.createElement("v:group");
				// this.stage.appendChild(this.group);
			// }
		} else {
			this.stage = document.createElementNS(this.svg.NS, 'svg');

			this.stage.style.overflow = 'visible';
			this.stage.style.position = 'absolute';
			this.stage.setAttribute('version', '1.1');
			this.stage.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
		}
		this.stage.style.position = "relative";
		obj.appendChild(this.stage);
	},
	strokeColor : "#333",
	strokeThickness : "2",
	fillColor : "#f00",
	drawLine : function(x1, y1, x2, y2) {
		var line;
		if (!this.supportsSvg()) {

			line = document.createElement("v:line");
			line.strokecolor = this.strokeColor;
			line.from = x1 + "," + y1;
			line.to = x2 + "," + y2;
			line.strokeweight = this.strokeThickness + "px";
			line.style.position = "absolute";
		} else {
			line = document.createElementNS(this.svg.NS, 'line');
			line.setAttribute('x1', x1);
			line.setAttribute('y1', y1);
			line.setAttribute('x2', x2);
			line.setAttribute('y2', y2);
			this.setSVGDefault(line);
		}

		this.stage.appendChild(line);

		//}
	},
	setSVGDefault : function(obj) {
		obj.setAttribute('stroke', this.strokeColor);
		obj.setAttribute('fill', this.fillColor);
		obj.setAttribute('stroke-width', this.strokeThickness);
		obj.style.position = "absolute";
	},
	setVMLDefault : function(obj) {
		obj.setAttribute('stroke', this.strokeColor);
		obj.setAttribute('strokecolor', this.strokeColor);
		obj.setAttribute('fillcolor', this.fillColor);
		obj.setAttribute('stroke-width', this.strokeThickness);
		obj.style.behavior = "url(#default#VML)";
		obj.style.position = "absolute";
	},
	setXY : function(obj, x, y) {
		obj.style.left = x + "px";
		obj.style.top = y + "px";
	},
	drawRect : function(x, y, w, h) {
		var rect;
		if (!this.supportsSvg()) {
			this.group = document.createDocumentFragment();
			rect = document.createElement("v:rect");
			rect.style.setAttribute('width', w);
			rect.style.setAttribute('height', h);
			this.setVMLDefault(rect);
			this.group.appendChild(rect);
			this.stage.appendChild(this.group);
		} else {
			rect = document.createElementNS(this.svg.NS, 'rect');
			rect.setAttribute('width', w);
			rect.setAttribute('height', h);
			rect.setAttribute('x', x);
			rect.setAttribute('y',y);
			this.setSVGDefault(rect);
			this.stage.appendChild(rect);
		}
		
		this.setXY(rect, x, y);
		// this.group.appendChild(rect);
		
	},
	drawCircle : function() {

		var grid2 = document.createElement("v:oval");

		grid2.style.width = "25pt";
		grid2.style.height = "75pt";
		grid2.style.position = "absolute";
		grid2.style.behavior = "url(#default#VML)";
		grid2.style.display = "inline-block";
		grid2.setAttribute("fillcolor", "#FF0000");
		grid2.setAttribute("id", "marker2");
		this.stage.appendChild(grid2);
	},
	supportsSvg : function() {
		return !!document.createElementNS && !!document.createElementNS('http://www.w3.org/2000/svg', "svg").createSVGRect;
	}
};
