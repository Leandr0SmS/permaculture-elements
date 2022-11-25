import { matutu } from "../class.js";

let elements = matutu.elements
//DOM title
const title = document.getElementById("sitoName");
title.innerText = matutu.name;
document.getElementById('elementsNames').innerText = `Elements: ${elements.length}`

//D3 elements
//elements name
const elementList = d3.select('ul').selectAll('li')
      .data(elements)
      .enter()
      .append('li')
      .text((d) => d.name)
      .attr('class', 'elements-li')
      .on('mouseover', function (d, i) {
            d3.select(this)
                  .style('color', 'yellow')
                  .text((d) => `${d.name}  ==> Inputs: ${d.inputs.join(', ')} / Outputs: ${d.outputs.join(', ')}`);
            })
      .on('mouseout', function (d, i) {
            d3.select(this)
                  .style('color', 'aliceblue')
                  .text((d) => d.name);
            });

//graphic
const w = 800;
const h = 500;

//function to find relations between elements of matutu
const elementsRelations = matutu.getRelationships().relationships;
//generating random positions for the elements
matutu.newRandomXY(w, h);

const visSvg = d3.select("#svgGraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style('background-color', 'rgb(62, 62, 62)')
      .style('border-radius', '5%')
      
//for each element of matutu, creat a line for each output
for (let elem of elements) {
      let outputsLines = elem.elementOutputs(elementsRelations);
      console.log(outputsLines)
      
      let g = visSvg.selectAll('g')
            //returns a array with outputsX1Y1, outputsx2Y2 and the thing they are exchanging
            .data(outputsLines)
            .enter()
            .append('g');

      g.append('line')
            .attr('x1', (d) => d.outputsX1Y1[0])
            .attr('y1', (d) => h - d.outputsX1Y1[1])
            .attr('x2', (d) => d.outputsX2Y2[0])
            .attr('y2', (d) => h - d.outputsX2Y2[1])
            .style("stroke", "rgb(255,0,0)")
            .style("stroke-width", 5)
            .append('title')
            .text((d) => d.output);

      const outputCircles = g
            .append('circle')
            .attr('r', 20)
            .attr('cx', (d) => d.outputsX1Y1[0])
            .attr('cy', (d) => h - d.outputsX1Y1[1]) // y is always inverted
            .style("fill", "Tomato");

      const inputCircles = g
            .append('circle')
            .attr('r', 20)
            .attr('cx', (d) => d.outputsX2Y2[0])
            .attr('cy', (d) => h - d.outputsX2Y2[1]) // y is always inverted
            .style("fill", "Tomato");

      
      g.on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('500')
                .attr('opacity', '.55');
            })
      .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('500')
                .attr('opacity', '1');
            });
}

/*const node = visSvg.selectAll('g').selectAll('circle')
      .data(elements)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('cx', (d) => d.randomXY[0])
      .attr('cy', (d) => h - d.randomXY[1]) // y is always inverted
      .style("fill", "Tomato");*/

const circlesTextLegend = visSvg.selectAll('text')
      .data(elements)
      .enter()
      .append('text')
      .text((d) => d.name)
      .attr('class', 'textLegend')
      .attr('x', (d) => d.randomXY[0] + 25)
      .attr('y', (d) => h - d.randomXY[1])
      .style("fill", "white")
      .on('mouseover', function (d, i) {
            d3.select(this).transition()
                .duration('500')
                .attr('opacity', '.55');
            })
      .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('500')
                .attr('opacity', '1');
            });