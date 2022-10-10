const { chicken, house, garden } = require('./objects')

const linksInOut = function (elementIn, elementOut) {
    let nodes = [];
    for (let i = 0; i < elementOut.outputs.length; i ++) {
        if (elementIn.inputs.includes(elementOut.outputs[i])) {
            nodes.push(elementOut.outputs[i]);
        }    
    }
    return nodes
}  

    
console.log(linksInOut(chicken, house));
console.log(linksInOut(house, chicken));
console.log(chicken.howAmI());
console.log(chicken.exchange(house));

