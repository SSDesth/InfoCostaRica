
/*
Ahora colocar las dimensiones específicas del svg, que es donde se dibujara todo
SVG significa Scalable Vector Graphics.
*/

var svgWidth = 900, svgHeight = 500;

var barWidth = (svgWidth / cantones.length);

var colorFigura = "#80ff00";

var tamannoFigura = 20;

//Selecciono el svg
var svg = d3.select('svg')
    //Modifico sus atributos, para definir todos los tamaños.
    .attr("width", svgWidth)
    .attr("height", svgHeight);

