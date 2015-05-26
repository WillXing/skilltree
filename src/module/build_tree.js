var d3 = require('d3');
var format_data = require('./format_data.js');

module.exports = function(data, in_height, in_width) {

    var root = format_data(data);

    var height = in_height ? in_height : 500,
        width = in_width ? in_width : 400;

    var node_height = 50,
        node_width = 70;

    var tree = d3.layout.tree()
        .size([height , width * 0.8]);

    var diagonal = d3.svg.diagonal()
        .projection(function(d) { return [d.y + node_width, d.x] });

    var svg = d3.select("body").append("svg")
        .attr("width", width+100)
        .attr("height", height)
        .append("g")
        .attr("transform", "translate( 10, 0)");

    var nodes = tree.nodes(root),
        links = tree.links(nodes);

    var link = svg.selectAll(".link")
        .data(links)
        .enter().append("path")
        .attr("class", "link")
        .attr("d", diagonal);


    var node = svg.selectAll(".node")
        .data(nodes)
        .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { return "translate(" + d.y + " , " + (d.x - node_height/2) + ")"; })

    node.append("rect")
        .attr("fill", function(d) {
            var attr = nodeAttr(d);
            return attr.bgc;
        })
        .attr("width", node_width)
        .attr("height", node_height);

    node.append("text")
        .attr("dy", '1em')
        .attr("dx", '0.2em')
        .attr("text-anchor", function(d) { return "start"; })
        .text(function(d) { return d.name; });

}

function nodeAttr(node) {
    var weight = node.weight;
    var attr = {};
    switch(weight){
        case "1":
            attr.bgc = "#009900";
            break;
        case "2":
            attr.bgc = "#3366FF";
            break;
        case "3":
            attr.bgc = "#CC0000";
            break;
        default:
            attr.bgc = "#FFFFFF";
    }
    return attr;
}
