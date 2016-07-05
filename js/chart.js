var Chart = function(options) {

	this.data = options.data;
	this.element = options.element;
	this.xVar = options.xVar;
	this.yVar = options.yVar;
	this.usmap = options.usmap;
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

	// this.element.innerHTML = '';
	this.canvas = d3.select(this.element).append('canvas')
		.attr('class','canvas');

	this.canvas.attr('height',this.height + this.margin.bottom + this.margin.top);
	this.canvas.attr('width',this.width + this.margin.left + this.margin.right);

	this.setScales();
	this.circle();
	// this.line();

};

Chart.prototype.setScales = function() {
	var m = this.margin;
	var that = this;

	var xExtent = d3.extent(that.data,function(d,i){return +d[that.xVar];});
	var yExtent = d3.extent(that.data,function(d,i){return +d[that.yVar];});
	this.scaleX = d3.scaleLinear()
		.range([0,that.width])
		.domain(xExtent);
	this.scaleY = d3.scaleLinear()
		.range([that.height,0])
		.domain(yExtent);
	this.scaleC = d3.scaleLinear()
		.range(['yellow','purple'])
		.interpolate(d3.interpolateHcl)
		.domain(xExtent);

};

Chart.prototype.county = function() {
	var that = this;
	var ctx = d3.select(that.element).select('canvas').node().getContext('2d');
 	var projection = d3.geo.albersUsa()
		.scale(that.width * 1.3)
		.translate([that.width / 2, that.height / 2]);

	var path = d3.geo.path()
		.projection(map.projection);

	topojson.feature(that.usmap,that.usmap.objects.counties).features.forEach(function(county,i){
		console.log(county);
	});


	map.path = d3.geo.path().projection(map.projection);

};

Chart.prototype.circle = function() {
	var that = this;
	var ctx = d3.select(that.element).select('canvas').node().getContext('2d');

	// ctx.clearRect(0, 0, that.width, that.height);


	that.data.forEach(function(d,i){
		var x = that.scaleX(d[that.xVar]);
		var y = that.scaleY(d[that.yVar]);
		var c = that.scaleC(d[that.xVar]);





		ctx.strokeStyle =  c;
		ctx.beginPath();
		ctx.strokeRect(x,y,10,10);

		ctx.fillStyle = "black";
		ctx.font = "8px Whitney Ssm";
		ctx.fillText("  " + d.area_fips,x,y);

		ctx.beginPath();
		ctx.fillStyle = c;
		ctx.arc(x,y,3,0,Math.PI*2);
		ctx.closePath();
		ctx.fill();

	});


};

Chart.prototype.label = function() {
	var that = this;
	var ctx = d3.select(that.element).select('canvas').node().getContext('2d');

	ctx.font = "6px Whitney Ssm";
	ctx.textAlign = "start";
	ctx.textBaseline = "hanging";
	ctx.fillText(d.fips);

};

Chart.prototype.line = function() {
	var that = this;
	var ctx = d3.select(that.element).select('canvas').node().getContext('2d');

	ctx.fillStyle="pink";
	var line = d3.line()
		.context(ctx)
		.x(function(d){return that.scaleX(d[that.xVar]);})
		.y(function(d){return that.scaleY(d[that.yVar]);});
	console.log(line.context(ctx)(that.data));
};
