"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crewmember = void 0;
var crewmembers_json_1 = __importDefault(require("../..//data/crewmembers.json"));
var Crewmember = /** @class */ (function () {
    function Crewmember() {
        this.id = 0;
        this.first_name = '';
        this.last_name = '';
        this.rating = '';
        this.base = '';
        this.img = '';
    }
    Crewmember.prototype.random = function () {
        var randomElement = crewmembers_json_1.default.crewmembers[Math.floor(Math.random() * crewmembers_json_1.default.crewmembers.length)];
        var crew = new Crewmember();
        crew.id = randomElement.id;
        crew.first_name = randomElement.first_name;
        crew.last_name = randomElement.last_name;
        crew.rating = randomElement.rating;
        crew.base = randomElement.base;
        return crew;
    };
    return Crewmember;
}());
exports.Crewmember = Crewmember;
//# sourceMappingURL=crewmember.js.map