"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airport = void 0;
var airports_json_1 = __importDefault(require("../../data/airports.json"));
var Airport = /** @class */ (function () {
    function Airport() {
        this.iata = '';
        this.icao = '';
        this.name = '';
        this.city = '';
        this.state = '';
        this.country = '';
        this.tz = '';
        this.elevation = 0;
        this.latitude = 0;
        this.longitude = 0;
    }
    Airport.prototype.random = function () {
        var randomElement = airports_json_1.default.airports[Math.floor(Math.random() * airports_json_1.default.airports.length)];
        var airport = new Airport();
        airport.name = randomElement.name;
        airport.iata = randomElement.iata;
        airport.icao = randomElement.icao;
        airport.city = randomElement.city;
        airport.country = randomElement.country;
        airport.elevation = randomElement.elevation;
        airport.latitude = randomElement.lat;
        airport.longitude = randomElement.lon;
        airport.state = randomElement.state;
        airport.tz = randomElement.tz;
        return airport;
    };
    Airport.prototype.distanceBetween = function (airport, unit) {
        if (unit === void 0) { unit = 'K'; }
        var lat1 = this.latitude;
        var lon1 = this.longitude;
        var lat2 = airport.latitude;
        var lon2 = airport.longitude;
        if (lat1 == lat2 && lon1 == lon2) {
            return 0;
        }
        else {
            var radlat1 = (Math.PI * lat1) / 180;
            var radlat2 = (Math.PI * lat2) / 180;
            var theta = lon1 - lon2;
            var radtheta = (Math.PI * theta) / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) +
                Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = (dist * 180) / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == 'K') {
                dist = dist * 1.609344;
            }
            if (unit == 'N') {
                dist = dist * 0.8684;
            }
            return dist;
        }
    };
    return Airport;
}());
exports.Airport = Airport;
//# sourceMappingURL=airport.js.map