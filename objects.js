class Sitio {
    constructor (name, elements) {
        this._name = name;
        this.elements = elements;
    }
    get name () {
        return this._name;
    };
    get numOfelements () {
        return this.elements.length
    };
    //Loop is not working... Need corrections to count the numbers of connections between elements from Sitio.
    get connections () {
        let counter = 0;
        for (let i = 0; i < this.elements.length; i ++) {
            if (this.elements[i].exchange(this.elements[i++])) {
                if (this.elements[i].exchange(this.elements[i++]).recives || this.elements[i].exchange(this.elements[i++]).gives) {
                    counter++;
                } else if (this.elements[i].exchange(this.elements[i++]).recives && this.elements[i].exchange(this.elements[i++]).gives) {
                    counter += 2;
                } 
            }
        }
        return counter;
    }
}

class SitioElement {
    constructor (name, inputs, outputs) {
        this._name = name;
        this._inputs = inputs;
        this._outputs = outputs;
    }
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

    howAmI () {
        return `\nI am a(n) ${this.name}:\nI need: ${this.inputs}.\nI produce: ${this.outputs}.`;
    };
    
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
}

const matutu = new Sitio ("Matutu", []);
const chicken = new SitioElement ("chicken", ["food", "water", "shelter", "portion"], ["food", "fertilizer"]);
const house = new SitioElement ("house", ["water", "eletricity", "gas", "food", "medicins"], ['shelter', "seeds", "sewage"]);
const garden = new SitioElement ("garden", ["water", "work", "seeds", "fertilizer"], ["food", "portion", "medicins"]);
const fosse = new SitioElement ('Fosse', ['sewage'], []);

module.exports = {chicken, house, garden, fosse};

console.log(chicken.sayYourExchangeWith(house));
console.log(house.exchange(fosse));
//console.log(house.sayYourExchangeWith(fosse));


