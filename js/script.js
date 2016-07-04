//Start the timer running
var timerStart = performance.now();

function elapsed(label){
   if(label === undefined){
	   label = "";
   } else {
	   label += ": ";
   }
   var milliseconds = performance.now()-timerStart;

   console.log(label + (milliseconds/1000).toFixed(4) + " sec");
}

d3.select('body').append('canvas');

d3.csv('31212.csv',function(error,brews) {
	console.log(brews.length);
	brews = brews.filter(function(f){
		console.log(f.size_code);
		return f.agglvl_code=="77";});
	console.log(brews.length);
	var chart = new Chart({
		element:document.querySelector('body div.chart'),
		data:brews,
		xVar:"area_fips",
		yVar:"qtrly_estabs"
	});
});
