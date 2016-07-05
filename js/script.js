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


d3.json('us2016.topo.json',function(error,usa){
	d3.csv('31212.csv',function(error,brews) {
		console.log(brews.length);
		brews = brews.filter(function(f){return f.agglvl_code=="77";});
		var chart = new Chart({
			element:document.querySelector('body div.chart'),
			data:brews,
			usmap:usa,
			xVar:"area_fips",
			yVar:"qtrly_estabs"
		});
	});
});
