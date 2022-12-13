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
      .style('background-color', '#1b1b32') // #3b3b4f // #0a0a23 // #1b1b32
      .style('border-radius', '5%')
      
//for each element of matutu, creat a line for each output
for (let elem of elements) {
      let outputsLines = elem.elementsIn_Outputs(elementsRelations).outputsLines;
      
      let gOut = visSvg.selectAll('.outputs')
            //returns a array with outputsX1Y1, outputsx2Y2 and the thing they are exchanging
            .data(outputsLines)
            .enter()
            .append('g')
            .attr('class', 'outputs');

      gOut.append('line')
            .attr('x1', (d) => d.outputsX1Y1[0] + 5)
            .attr('y1', (d) => h - d.outputsX1Y1[1] - 5)
            .attr('x2', (d) => d.InputsX2Y2[0] + 5)
            .attr('y2', (d) => h - d.InputsX2Y2[1] - 5)
            .attr('opacity', '.50')
            .attr('class', `outputs${elem.name}`)
            .style("stroke", "rgb(255,0,0)")
            .style("stroke-width", 5)
            .append('title')
            .text((d) => d.output);

      gOut.append('text')
            .text('Outputs')
            .attr('class', 'IntextLegend')
            .attr('x', (d) => d.outputsX1Y1[0] + 25)
            .attr('y', (d) => h - d.outputsX1Y1[1] - 20)
            .attr('opacity', '.50')
            .style("fill", "red")
            .on('mouseover', function (d, i) {
                  d3.selectAll(`.outputs${elem.name}`).transition()
                      .duration('50')
                      .style("stroke", "rgb(255,255,255)")
                  })
            .on('mouseout', function (d, i) {
                  d3.selectAll(`.outputs${elem.name}`).transition()
                      .duration('50')
                      .style("stroke", "rgb(255,0,0)");
                  })
            .append('title')
            .text((d) => d.output);
      
      /*const outputCircles = gOut
            .append('circle')
            .attr('r', 20)
            .attr('cx', (d) => d.outputsX1Y1[0] + 10)
            .attr('cy', (d) => h - d.outputsX1Y1[1] - 10) // y is always inverted
            .style("fill", "Tomato");*/
}

//for each element of matutu, creat a line for each input
for (let elem of elements) {
      let inputsLines = elem.elementsIn_Outputs(elementsRelations).inputsLines;

      let gIn = visSvg.selectAll('.inputs')
            //returns a array with outputsX1Y1, outputsx2Y2 and the thing they are exchanging
            .data(inputsLines)
            .enter()
            .append('g')
            .attr('class', 'inputs');

      gIn.append('line')
            .attr('x1', (d) => d.inputsX1Y1[0] - 5)
            .attr('y1', (d) => h - d.inputsX1Y1[1] - 5)
            .attr('x2', (d) => d.outputsX2Y2[0] - 5)
            .attr('y2', (d) => h - d.outputsX2Y2[1] - 5)
            .attr('opacity', '.50')
            .attr('class', `inputs${elem.name}`)
            .style("stroke", "green")
            .style("stroke-width", 5)
            .append('title')
            .text((d) => d.input);

      gIn.append('text')
            .text('inputs')
            .attr('class', 'IntextLegend')
            .attr('x', (d) => d.inputsX1Y1[0] + 25)
            .attr('y', (d) => h - d.inputsX1Y1[1] + 20)
            .attr('opacity', '.50')
            .style("fill", "green")
            .on('mouseover', function (d, i) {
                  d3.selectAll(`.inputs${elem.name}`).transition()
                      .duration('50')
                      .style("stroke", "white");
                  })
            .on('mouseout', function (d, i) {
                  d3.selectAll(`.inputs${elem.name}`).transition()
                      .duration('50')
                      .style("stroke", "green");
                  })
            .append('title')
            .text((d) => d.input);
      
      /*const inputCircles = gIn
            .append('circle')
            .attr('r', 20)
            .attr('cx', (d) => d.inputsX1Y1[0] - 10)
            .attr('cy', (d) => h - d.inputsX1Y1[1] - 10) // y is always inverted
            .style("fill", "green");*/
}

const circle = visSvg.selectAll('circle')
      .data(elements)
      .enter()
      .append('circle')
      .attr('r', 15)
      .attr('cx', (d) => d.randomXY[0])
      .attr('cy', (d) => h - d.randomXY[1]) // y is always inverted
      .style("fill", "Tomato")
      .append('title')
      .text((d) => d.howAmI());

const circlesTextLegend = visSvg.selectAll('textLegend')
      .data(elements)
      .enter()
      .append('text')
      .text((d) => d.name)
      .attr('class', 'textLegend')
      .attr('x', (d) => d.randomXY[0] + 25)
      .attr('y', (d) => h - d.randomXY[1])
      .style("fill", "white");