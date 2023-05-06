import {Element} from "./class.js";

//Sitio Matutu
const matutu = new Element ("Sítio São José do Matutu", ['food', 'portion', 'gas', 'oil'], ['fertilizer', 'bananas', 'açaí'], []);

//Elements in sitio Matutu
const chicken = new Element ("Chicken", ["food", "water", "shelter", "portion"], ["food", "manure"], []);
const house = new Element ("House", ["water", "eletricity", "gas", "food", "medicins"], ['shelter', "seeds", "sewage"], []);
const garden = new Element ("Garden", ["water", "work", "seeds", "fertilizer"], ["food", "portion", "medicins"], []);
const fosse = new Element ('Fosse', ['sewage'], [], []);
const dehydrator = new Element ("Dehydrator", ["manure", "grass"], ["fertilizer"])


matutu.elements.push(chicken, house, garden, fosse, dehydrator);

export {matutu};