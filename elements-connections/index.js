import { matutu } from "./class.js";

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
      .on('mouseover', function (d, i) {
            d3.select(this)
                  .text((d) => `${d.name}  ==> Inputs: ${d.inputs.join(', ')} / Outputs: ${d.outputs.join(', ')}`);
            })
      .on('mouseout', function (d, i) {
            d3.select(this)
                  .text((d) => d.name);
            })

//graphic
const w = 800;
const h = 500;

//generating random positions for the elements
matutu.newRandomXY(w, h);
const connectionLines = matutu.getRelationships().relationshipsLines;

const visSvg = d3.select("#svgGraph")
      .append("svg")
      .attr("width", w)
      .attr("height", h)
      .style('background-color', 'rgb(62, 62, 62)')
      .style('border-radius', '5%')

const circles = visSvg.selectAll('circle')
      .data(elements)
      .enter()
      .append('circle');

const circlesAttr = circles
      .attr('r', 20)
      .attr('cx', (d) => d.randomXY[0])
      .attr('cy', (d) => h - d.randomXY[1]) // y is always inverted
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
            })
      .append('title')
      .text((d) => d.howAmI())

const connections = visSvg.selectAll('line')
      .data(connectionLines)
      .enter()
      .append('line')
      .attr('x1', (d) => d.positionX1Y1[0])
      .attr('y1', (d) => h - d.positionX1Y1[1])
      .attr('x2', (d) => d.positionX2Y2[0])
      .attr('y2', (d) => h- d.positionX2Y2[1])
      .style("stroke", "rgb(255,0,0)")
      .style("stroke-width", 5)
      .append('title')
      .text((d) => d.inputsX2Y2);

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

circles.on('mouseover', function (d, i) {
      d3.select(this).transition()
          .duration('500')
          .attr('opacity', '.55')
          .style("fill", "red")
      })
      .on('mouseout', function (d, i) {
            d3.select(this).transition()
                .duration('500')
                .attr('opacity', '1')
                .style("fill", "white");
      });
