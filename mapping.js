(function(){
	var g;
	var width = 900;
	var height = 650;

	var map = d3.select('#map_').append('svg')
		.attr('width', width)
		.attr('height', height)
		.append('g');

	d3.json("aaa.geojson", function(json){
		var projection,path;

		projection = d3.geoMercator()
			.scale(45000)
			.center(d3.geoCentroid(json))
			.translate([width/2, height/2]);

		path = d3.geoPath().projection(projection);

		map.selectAll('path')
			.data(json.features)
			.enter()
			.append('path')
			.attr('d',path)
			.attr('fill', function(d){
				//if()
				return "hsl(0,0%,80%)";
			})
			.attr("stroke","hsl(80,100%,0%)")
			.on('mouseover', function(d){
				d3.select('svg')
				.append('text')
				.attr('x',d3.event.x-d3.event.offsetX/2)
				.attr('y',d3.event.y)
				.attr("class", "ward-label")
				.text(d.properties.N03_004);
			})
			.on('mouseout', function(d){
				d3.select('svg').select(".ward-label").remove();
			})
			.on('click',function(d){
				d3.select(this).attr('fill',"hsl(30,70%,60%)");
			});
	});

})();