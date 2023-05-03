import {Element} from "./class.js";

//Sitio Matutu
const matutu = new Element ("Sítio São José do Matutu", ['food', 'portion', 'gas', 'oil'], ['fertilizer', 'bananas', 'açaí'], []);

//Elements in sitio Matutu
const chicken = new Element ("chicken", ["food", "water", "shelter", "portion"], ["food", "fertilizer"], []);
const house = new Element ("house", ["water", "eletricity", "gas", "food", "medicins"], ['shelter', "seeds", "sewage"], []);
const garden = new Element ("garden", ["water", "work", "seeds", "fertilizer"], ["food", "portion", "medicins"], []);
const fosse = new Element ('Fosse', ['sewage'], [], []);


matutu.elements.push(chicken, house, garden, fosse);

export {matutu};