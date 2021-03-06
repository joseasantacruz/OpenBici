function dibujarElMapa(ancho, alto) {
	//var scriptPram = document.getElementById('id_script_zoom');
	//var nombreArchivo = "http://opendata.pol.una.py/raw/export/data/99aacd15baf14bacd701fd9d49d0c98b.json";
	var nombreArchivo = "http://opendata.pol.una.py/raw/export/data/4b81d4f30f88fcfa6afc0437541656b8.json";
	var nombreGrafico = "zoomable_treemap.js"
	// grafico
	var margin = {
		top : 20,
		right : 0,
		bottom : 0,
		left : 0
	}, width = ancho, height = (alto*0.95) - margin.top - margin.bottom, formatNumber = d3
			.format(",d"), transitioning;
	var x = d3.scale.linear().domain([ 0, width ]).range([ 0, width ]);

	var y = d3.scale.linear().domain([ 0, height ]).range([ 0, height ]);

	var treemap = d3.layout.treemap().children(function(d, depth) {
		return depth ? null : d._children;
	}).sort(function(a, b) {
		return a.value - b.value;
	}).ratio(height / width * 0.5 * (1 + Math.sqrt(5))).round(false);

	// chart_raw

	var svg=d3.select("#chart").append("svg");
	var color = d3.scale.category20c();
	var grandparent;
	
	var tip= d3.tip()
		.attr('class', 'd3-tip')
		.style("opacity", 1)
		.offset([-5, 0])
		.style("line-height",1)
		.style("font-weight","bold")
		.style("padding","12px")
		.style("background","rgba(0, 0, 0, 0.8)")
		.style("color","#fff")
		.style("border-radius","2px")
		.html(function(d) {
			var name = d.name;
		var porcen = d.parent ? (d.value/d.parent.value) * 100 : 100;
		porcen=redondeo2decimales(porcen);
		var padre = d.parent ? " sobre  &nbsp"+d.parent.class+" " : '';
			return "<p style=\"color:white\"><strong>Grupo: &nbsp</strong> <span >" + d.class + "</span></p>" + 
					"<p style=\"color:white\"> <strong>Cantidad: &nbsp</strong> <span >" + format_number(d.value) + "</span></p>" + 
					"<p style=\"color:white\"> <strong>Porcentaje"+padre+":</strong> "+ porcen +"%" ;
		});
	
	function format_number(x) {
		return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}

	/**
	 * Redondeo de numeros
	 */
	function redondeo2decimales(numero) {
		var flotante = parseFloat(numero);
		var resultado = Math.round(flotante*100)/100;
		return resultado;
	}
	
	var partition = d3.layout.partition().value(function(d) {
		return d.size;
	});

	d3.json(nombreArchivo, function(error, data) {
		
		svg
		.attr("width", width + margin.left + margin.right)
		.attr("height",height )
		.style("margin-left",-margin.left + "px")
		.style("margin.right", -margin.right + "px")
			
		
		grandparent = svg.append("g").attr("class", "grandparent");
		var volver=grandparent.append("rect")
								.attr("y", 0).attr("width", width)
								.attr("height", margin.top)
								.style("fill",color("volver"))
								.style("cursor","pointer")
								.style("stroke","#fff")
								.style("padding","5px")
									

		

		svg.append("g").attr("transform","translate(" + margin.left + "," + margin.top + ")")
		.style("shape-rendering", "crispEdges").attr("y",margin.top).attr("id","rects");
		nodes = partition.nodes(data);
		
		
				
		initialize(data);
		accumulate(data);
		layout(data);
		display(data);
		
	})

	function initialize(root) {
		root.x =  0;
		root.y = margin.top;
		root.dx = width;
		root.dy = height;
		root.depth = 0;
	}

	// Aggregate the values for internal nodes. This is normally done by the
	// treemap layout, but not here because of our custom implementation.
	// We also take a snapshot of the original children (_children) to avoid
	// the children being overwritten when when layout is computed.
	function accumulate(d) {
		return (d._children = d.children) ? d.value = d.children.reduce(
				function(p, v) {
					return p + accumulate(v);
				}, 0) : d.value;
	}

	// Compute the treemap layout recursively such that each group of siblings
	// uses the same size (1Ã—1) rather than the dimensions of the parent cell.
	// This optimizes the layout for the current zoom state. Note that a wrapper
	// object is created for the parent node for each group of siblings so that
	// the parentâ€™s dimensions are not discarded as we recurse. Since each group
	// of sibling was laid out in 1Ã—1, we must rescale to fit using absolute
	// coordinates. This lets us use a viewport to zoom.
	function layout(d) {
		if (d._children) {
			treemap.nodes({
				_children : d._children
			});
			d._children.forEach(function(c) {
				c.x = d.x + c.x * d.dx;
				c.y = d.y + c.y * d.dy;
				c.dx *= d.dx;
				c.dy *= d.dy;
				c.parent = d;
				layout(c);
			});
		}
	}

	function display(d) {
		grandparent.datum(d.parent).on("click", transition).select("text")
				.text(name(d));

		var g1 = svg.insert("g", ".grandparent").datum(d)
				.attr("class", "depth");

		var g = g1.selectAll("g").data(d._children).enter().append("g");

		g.filter(function(d) {
			return d._children;
		}).classed("children", true).on("click", transition);

		g.selectAll(".child").data(function(d) {
			return d._children || [ d ];
		}).enter().append("rect").attr("class", "child").call(rect);
		
		g.call(tip);	
		g.append("rect").attr("class", "parent")
		.call(rect)
		.on("mouseover",function(d){tip.show(d);mouseover(d)})
		.on("mouseout", function(d){tip.hide(d);mouseleave(d)})
			/*.call(rect).append("title")
				.text(function(d) {
					return formatNumber(d.value);
				});*/

		g.append("text").attr("dy", ".75em").text(function(d) {
			return d.name;
		}).style("padding","5px").call(text);

		function transition(d) {
			if (transitioning || !d)
				return;
			transitioning = true;

			var g2 = display(d), t1 = g1.transition().duration(550), t2 = g2
					.transition().duration(550);

			// Update the domain only after entering new elements.
			x.domain([ d.x, d.x + d.dx ]);
			y.domain([ d.y, d.y + d.dy ]);

			// Enable anti-aliasing during the transition.
			svg.style("shape-rendering", null);

			// Draw child nodes on top of parent nodes.
			svg.selectAll(".depth").sort(function(a, b) {
				return a.depth - b.depth;
			});

			// Fade-in entering text.
			g2.selectAll("text").style("fill-opacity", 0);

			// Transition to the new view.
			t1.selectAll("text").call(text).style("fill-opacity", 0);
			t2.selectAll("text").call(text).style("fill-opacity", 1);
			t1.selectAll("rect").call(rect);
			t2.selectAll("rect").call(rect);

			// Remove the old node when the transition is finished.
			t1.remove().each("end", function() {
				svg.style("shape-rendering", "crispEdges");
				transitioning = false;
			});
		}

		return g;
	}

	function text(text) {
		text.attr("x", function(d) {
			return x(d.x) + 6;
		}).attr("y", function(d) {
			return y(d.y) + 6 + margin.top;
		});
	}

	function rect(rect) {
		rect.attr("x", function(d) {
			return x(d.x);
		}).attr("y", function(d) {
			return y(d.y);
		}).attr("width", function(d) {
			return x(d.x + d.dx) - x(d.x);
		}).attr("height", function(d) {
			return y(d.y + d.dy) - y(d.y);
		}).style("fill",function(d){return color(d.name)})
		.style("stroke", "#fff")
		.style("padding", "5px");
	}
	
	function getAncestors(node) {
	  var camino = [];
	  var current = node;
	  while (current.parent) {
		camino.unshift(current);
		current = current.parent;
	  }
	  return camino;
	}
	
	function mouseover(d){
		svg.selectAll("rect")
      .style("opacity", 0.2);
	  var sequenceArray = getAncestors(d);

	  // Then highlight only those that are an ancestor of the current segment.
	  svg.selectAll("rect")
		  .filter(function(node) {
                return (sequenceArray.indexOf(node) >= 0);
              })
      .style("opacity", 1);
	}
	
	function mouseleave(d){
		svg.selectAll("rect")
      .style("opacity", 1);
	}
	

	function name(d) {
		return d.parent ? name(d.parent) + "." + d.name : d.name;
	}
};