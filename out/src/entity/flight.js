"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Flight = void 0;
var airport_1 = require("./airport");
var luxon = __importStar(require("luxon"));
var Flight = /** @class */ (function () {
    function Flight(id) {
        this.id = 0;
        this.aircraft_registration = '';
        this.departure_airport = new airport_1.Airport();
        this.arrival_airport = new airport_1.Airport();
        this.distance = 0;
        this.estimated_time_departure = luxon.DateTime.utc();
        this.estimated_time_arrival = luxon.DateTime.utc();
        this.crewmembers = new Array();
        this.id = id;
    }
    Flight.prototype.duration = function () {
        return this.estimated_time_departure.diff(this.estimated_time_arrival);
    };
    return Flight;
}());
exports.Flight = Flight;
//# sourceMappingURL=flight.js.map