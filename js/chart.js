var Chart = function(options) {

	this.data = options.data;
	this.element = options.element;
	this.xVar = options.xVar;
	this.yVar = options.yVar;

	this.draw();

};

Chart.prototype.draw = function() {

	this.margin = {
		top: 10,
		right:10,
		bottom: 10,
		left: 10
	};

	this.width = this.element.offsetWidth - this.margin.right-this.margin.left;
	this.height = this.width * 0.75;

	this.element.innerHTML = '';
	this.canvas = d3.select(this.element).append('canvas').attr('id','bucket');
	this.canvas.attr('height',this.height);
	this.canvas.attr('width',this.width);

	this.plot = this.canvas.append('g');

	this.setScales();
	this.circle();

};

Chart.prototype.setScales = function() {
	var m = this.margin;
	var that = this;

	console.log(this.xVar);
	var xExtent = d3.extent(that.data,function(d,i){return +d[that.xVar];});
	var yExtent = d3.extent(that.data,function(d,i){return +d[that.yVar];});
	this.scaleX = d3.scale.linear()
		.range([0,that.width])
		.domain(xExtent);
	this.scaleY = d3.scale.linear()
		.range([that.height,0])
		.domain(yExtent);
	this.scaleC = d3.scale.linear()
		.range(['pink','purple'])
		.interpolate(d3.interpolateHcl)
		.domain(xExtent);


	console.log(this.scaleY.domain());
	console.log(this.scaleY.range());

};

Chart.prototype.circle = function() {
	var that = this;
	var ctx = document.getElementById('bucket').getContext('2d');

	ctx.clearRect(0, 0, that.width, that.height);

	that.data.forEach(function(d,i){
		var x = that.scaleX(d[that.xVar]);
		var y = that.scaleY(d[that.yVar]);
		var c = that.scaleC(d[that.xVar]);
		// console.log(x+', '+y);
		ctx.beginPath();
		ctx.fillStyle = c;
		ctx.arc(x,y,3,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();
	});


};
