class Sitio {
    constructor (name, inputs, outputs, elements) {
        this._name = name;
        this._inputs = inputs;
        this._outputs = outputs;
        this.elements = elements;
        this.randomXY = [];

    };

    //getter and setters
    get name () {
        return this._name;
    };
    get inputs () {
        return this._inputs;
    };
    get outputs () {
        return this._outputs;
    };
    set name (name) {
        this._name = name;
    };
    set inputs (inputs) {
        this._inputss = [inputs]
    };
    set outputs (outputs) {
        this._outputs = [outputs];
    };
    get numOfelements () {
        return this.elements.length
    };

    //tell to terminal what element is
    howAmI () {
        return `\nI am a(n) ${this.name}:\nI need: ${this.inputs.join(', ')}.\nI produce: ${this.outputs.join(', ')}.`;
    };
    
    //Method to compare two elements inputs and outputs. 
    exchange (obj) {
        let gives = [];
        let recives = []; 
        //lopp for gives
        for (let i = 0; i < this.outputs.length; i ++) {
            if (obj.inputs.includes(this.outputs[i])){
               gives.push(this.outputs[i]);
            }
        };
        //loop for recives
        for (let j = 0; j < this.inputs.length; j ++) {
            if (obj.outputs.includes(this.inputs[j])) {
                recives.push(this.inputs[j]);
            }
        };
        //returns conditions
        if (gives.length === 0 && recives.length === 0) {
            return false;
        } else if (gives.length > 0 && recives.length > 0) {
            return {gives, recives};
        } else if (gives.length > 0 || recives.length > 0) {
            return {gives} || {recives};
        } else {
            return false;
        };
    };

    //Method to print in the terminal what are the elements exchanges with other argument element
    sayYourExchangeWith (obj) {
        if (this.exchange(obj).gives && this.exchange(obj).recives) {
            return `\nI ${this.name} give to ${obj.name}: ${this.exchange(obj).gives}\nI recive from ${obj.name}: ${this.exchange(obj).recives}`;
        } else if (this.exchange(obj).gives && !this.exchange(obj).recives) {
            return `\nI ${this.name} give to ${obj.name}: ${this.exchange(obj).gives}`;
        } else if (!this.exchange(obj).gives && this.exchange(obj).recives) {
            return `\nI ${this.name} recive from ${obj.name}: ${this.exchange(obj).recives}`;
        } else {
            return 'There is no exchange.';
        }
    }

    //return the connection between elements and the number of connections
    getRelationships() {
        let counter = 0;
        const relationshipsLines = []
        for (let i = 0; i < this.elements.length; i++) {
          for (let ii = 0; ii < this.elements.length; ii++) {
            if (this.elements[i].name === this.elements[ii].name) {
              continue
            }
            for (let iii = 0; iii < this.elements[i].inputs.length; iii++) {
              for (let iiii = 0; iiii < this.elements[ii].outputs.length; iiii++) {
                if (this.elements[i].inputs[iii] === this.elements[ii].outputs[iiii]) {
                  counter ++;
                  relationshipsLines.push( 
                    {'positionX1Y1': this.elements[ii].randomXY, 'outputsX1Y1': this.elements[ii].outputs[iiii], 'positionX2Y2': this.elements[i].randomXY, 'inputsX2Y2': this.elements[i].inputs[iii]}
                  )
                }
              }
            }
          }
        }
        return {relationshipsLines, counter}
      }

    // define cirles positions
    newRandomXY (w, h) {
        function randomRange(myMin, myMax) {
            return Math.floor(Math.random() * (myMax - myMin + 1)) + myMin; 
        }
        for (let i = 0; i < this.elements.length; i ++) {
            this.elements[i].randomXY.push(randomRange((w / 8), (w * 7 / 8)), randomRange((h / 8), (h * 7 / 8)));
        }
    }
};

class SitioElement extends Sitio {
    constructor (name, inputs, outputs, elements) {
        super(name, inputs, outputs, elements);
    }
}


const matutu = new Sitio ("Sítio São José do Matutu", ['food', 'portion', 'gas', 'oil'], ['fertilizer', 'bananas', 'açaí'], []);
const chicken = new SitioElement ("chicken", ["food", "water", "shelter", "portion"], ["food", "fertilizer"], []);
const house = new SitioElement ("house", ["water", "eletricity", "gas", "food", "medicins"], ['shelter', "seeds", "sewage"], []);
const garden = new SitioElement ("garden", ["water", "work", "seeds", "fertilizer"], ["food", "portion", "medicins"], []);
const fosse = new SitioElement ('Fosse', ['sewage'], [], []);
matutu.elements.push(chicken, house, garden, fosse);

export {matutu};