

var arbolDatos = [
  {
    "name": "Costa Rica",
     "cant":"5048263",
    "parent": "null",
    "children": [
      {
        "name": "Población de 15 años y más",
        "parent": "Top Level",
        "cant":"3936704",
        "children": [
          {
            "name": "Ocupada",
            "cant":"2183195",
            "parent": "Población de 15 años y más",
            "children": [
              {
                "name": "De 15 a 24 años",
              "cant":"235994",
              "parent": "Ocupada"
              },
              {
                "name": "De 25 a 34 años",
              "cant":"555429",
              "parent": "Ocupada"
              },
              {
                "name": "De 35 a 44 años",
              "cant":"508361",
              "parent": "Ocupada"
              },
              {
                "name": "De 45 a 59 años",
              "cant":"658805",
              "parent": "Ocupada"
              },
              {
                "name": "De 60 años o más",
              "cant":"223561",
              "parent": "Ocupada"
              },
              {
                "name": "No especificado",
              "cant":"1045",
              "parent": "Ocupada"
              }
            ]
          },          {
            "name": "Desempleada",
            "cant":"295580",
            "parent": "Población de 15 años y más",
             "children": [
             {
              "name": "Con experiencia",
              "cant":"256102",
              "parent": "Desempleada"
              },{
              "name": "Por razones del mercado",
              "cant":"193675",
              "parent": "Desempleada"
              },{
              "name": "Por razones personales",
              "cant":"62427",
              "parent": "Desempleada"
              },
              {
              "name": "Sin experiencia",
              "cant":"39478",
              "parent": "Desempleada"
              }

             
             ]
          }
        ]
      },
      {
        "name": "Poblacion menor de 15",
        "cant":"1111559",
        "parent": "Top Level"
      }
    ]
  }
];


//margen de la pantalla
var margin = {top: 20, right: 120, bottom: 20, left: 120},
	width = 900 - margin.right - margin.left,
	height = 500 - margin.top - margin.bottom;

//tiempo duracion nodos al desplegarse o clickear
var i = 0,
	duration = 800,
	root;
//dimensiones arbol
var arbol = d3.layout.tree()
	.size([height, width]);

var diagonal = d3.svg.diagonal()
	.projection(function(d) { return [d.y, d.x]; });

var svg = d3.select("body").append("svg")
	.attr("width", width + margin.right + margin.left)
	.attr("height", height + margin.top + margin.bottom)
  .append("g")
  .data(arbolDatos)
	.attr("transform", "translate(" + margin.left + "," + margin.top + ")");

root = arbolDatos[0];
root.x0 = height / 2;
root.y0 = 0;
 // carga el arbol con los datos
update(root);
//Posicion del primer nodo
d3.select(self.frameElement).style("height", "500px");

function update(source) {

  var nodes = arbol.nodes(root).reverse(),
	  links = arbol.links(nodes);

 
  nodes.forEach(function(d) { d.y = d.depth * 180; });


  var node = svg.selectAll("g.node")
	  .data(nodes, function(d) { return d.id || (d.id = ++i); });


  var nodeEnter = node.enter().append("g")
	  .attr("class", "node")
	  .attr("transform", function(d) { return "translate(" + source.y0 + "," + source.x0 + ")"; })
	  .on("click", click)
    .on("mouseover", function(d,i){
      var coordinates= d3.mouse(this);
      var x = d3.event.pageX + 15;
      var y = d3.event.pageY+ 15;


      document.getElementById("mostrarInfo").style.top= y + "px";
      document.getElementById("mostrarInfo").style.left= x + "px";

      document.getElementById("infoNombre").innerHTML = d.name;
      document.getElementById("infoCant").innerHTML = d.cant;
    })
    .on("mouseout", function(d,i){
      document.getElementById("mostrarInfo").style.top="-500px";
      document.getElementById("mostrarInfo").style.left="-500px";

    })
    ;

  nodeEnter.append("circle")
	  .attr("r", 100)
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeEnter.append("text")
	  .attr("x", function(d) { return d.children || d._children ? -45: 30; })
	  .attr("dy", ".35em")
	  .attr("text-anchor", function(d) { return d.children || d._children ? "end" : "start"; })
	  .text(function(d) { return d.name; })
	  .style("fill-opacity", 1e-6);

  
  var nodeUpdate = node.transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + d.y + "," + d.x + ")"; });

  nodeUpdate.select("circle")
	  .attr("r", function(d) { return ((d.cant*100)/5048263)/2.5})
	  .style("fill", function(d) { return d._children ? "lightsteelblue" : "#fff"; });

  nodeUpdate.select("text")
	  .style("fill-opacity", 1);


  var nodeExit = node.exit().transition()
	  .duration(duration)
	  .attr("transform", function(d) { return "translate(" + source.y + "," + source.x + ")"; })
	  .remove();

  nodeExit.select("circle")
	  .attr("r", 1e-6);

  nodeExit.select("text")
	  .style("fill-opacity", 1e-6);

  
  var link = svg.selectAll("path.link")
	  .data(links, function(d) { return d.target.id; });


  link.enter().insert("path", "g")
	  .attr("class", "link")
	  .attr("d", function(d) {
		var o = {x: source.x0, y: source.y0};
		return diagonal({source: o, target: o});
	  });


  link.transition()
	  .duration(duration)
	  .attr("d", diagonal);


  link.exit().transition()
	  .duration(duration)
	  .attr("d", function(d) {
		var o = {x: source.x, y: source.y};
		return diagonal({source: o, target: o});
	  })
	  .remove();

  
  nodes.forEach(function(d) {
	d.x0 = d.x;
	d.y0 = d.y;
  });
}


var tip = d3.tip()
    .attr('class', 'd3-tip')
    .offset([-10, 0])
    .html(function (d) {
        return "<strong>Cant\u00F3n:</strong> <span style='color:red'>" + d.nombre + "</span> <br>" +
            "<strong>Poblaci\u00F3n:</strong> <span style='color:red'>" + d.poblacion + " habitantes</span> <br>" +
            "<strong>\u00C1rea:</strong> <span style='color:red'>" + d.area + " km²</span> <br>" +
            "<strong>Densidad:</strong> <span style='color:red'>" + d.densidad + " habitantes/km²</span> <br>";
    });

//Aplico los tooltips
svg.call(tip);

function click(d) {
  
 /* document.getElementById("infoNombre").innerHTML = d.name;
  document.getElementById("infoCant").innerHTML = d.cant;
*/
  if (d.children) {
	d._children = d.children;
	d.children = null;
  } else {
	d.children = d._children;
	d._children = null;
  }
  
  update(d);

}
