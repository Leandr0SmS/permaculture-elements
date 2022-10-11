class Sitio {
    constructor (name, inputs, outputs, elements) {
        this._name = name;
        this._inputs = inputs;
        this._outputs = outputs;
        this.elements = elements;

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
        this._inputs = [inputs]
    };
    set outputs (outputs) {
        this._outputs = [outputs];
    };
    get numOfelements () {
        return this.elements.length
    };

    //tell to terminal what element is
    howAmI () {
        return `\nI am a(n) ${this.name}:\nI need: ${this.inputs}.\nI produce: ${this.outputs}.`;
    };
    
    //Method to compare two elements inputs and outputs. 
    exchange (obj) {
        let gives = [];
        let recives = []; 
        for (let i = 0; i < this.outputs.length; i ++) {
            if (obj.inputs.includes(this.outputs[i])){
               gives.push(this.outputs[i]);
            }
        };
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

    //  !!!  It isn't working !!! Need correction to return counter with the number of conections between elements !!!
    get connections () {
        let counter = 0;
        if (matutu.elements[0].exchange(matutu.elements[1])) {
            counter ++;
        }
        if (matutu.elements[1].exchange(matutu.elements[2])) {
            counter ++;
        }
        if (matutu.elements[2].exchange(matutu.elements[3])) {
            counter ++;
        }
        if (matutu.elements[3].exchange(matutu.elements[0])) {
            counter ++;
        }
        return counter;
    }
};

class SitioElement extends Sitio {
    constructor (name, inputs, outputs, elements) {
        super(name, inputs, outputs, elements);
    }
}

const matutu = new Sitio ("Matutu", ['food', 'portion', 'gas', 'oil'], ['fertilizer', 'bananas', 'açaí'], []);
const chicken = new SitioElement ("chicken", ["food", "water", "shelter", "portion"], ["food", "fertilizer"], []);
const house = new SitioElement ("house", ["water", "eletricity", "gas", "food", "medicins"], ['shelter', "seeds", "sewage"], []);
const garden = new SitioElement ("garden", ["water", "work", "seeds", "fertilizer"], ["food", "portion", "medicins"], []);
const fosse = new SitioElement ('Fosse', ['sewage'], [], []);
matutu.elements.push(chicken, house, garden, fosse);
module.exports = {chicken, house, garden, fosse};

console.log(matutu.connections);

// That is the result I would expect
console.log(matutu.elements[0].exchange(matutu.elements[1]));
console.log(matutu.elements[1].exchange(matutu.elements[2]));
console.log(matutu.elements[2].exchange(matutu.elements[3]));
console.log(matutu.elements[3].exchange(matutu.elements[0]));

