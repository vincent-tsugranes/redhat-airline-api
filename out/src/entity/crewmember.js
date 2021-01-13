"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Crewmember = void 0;
var crewmembers_json_1 = __importDefault(require("../..//data/crewmembers.json"));
var Crewmember = /** @class */ (function () {
    function Crewmember() {
        this.first_name = "";
        this.last_name = "";
        this.rating = "";
        this.base = "";
    }
    Crewmember.prototype.random = function () {
        var crewmembers = new Array();
        crewmembers_json_1.default.crewmembers.forEach(function (crewJson) {
            var crew = new Crewmember();
            crew.first_name = crewJson.first_name;
            crew.last_name = crewJson.last_name;
            crew.rating = crewJson.rating;
            crew.base = crewJson.base;
            crewmembers.push(crew);
        });
        var randomElement = crewmembers[Math.floor(Math.random() * crewmembers.length)];
        return randomElement;
    };
    return Crewmember;
}());
exports.Crewmember = Crewmember;
//# sourceMappingURL=crewmember.js.map