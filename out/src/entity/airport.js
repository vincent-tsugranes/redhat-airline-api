"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Airport = void 0;
var airports_json_1 = __importDefault(require("../..//data/airports.json"));
var Airport = /** @class */ (function () {
    function Airport() {
        this.iata = "";
        this.icao = "";
        this.name = "";
        this.city = "";
        this.state = "";
        this.country = "";
        this.tz = "";
        this.elevation = 0;
        this.latitude = 0;
        this.longitude = 0;
    }
    //coordinates: Coordinates = [this.lat, this.lon];
    Airport.prototype.random = function () {
        var airports = new Array();
        airports_json_1.default.airports.forEach(function (airportJson) {
            var airport = new Airport();
            airport.name = airportJson.name;
            airport.iata = airportJson.iata;
            airport.icao = airportJson.icao;
            airport.city = airportJson.city;
            airport.country = airportJson.country;
            airport.elevation = airportJson.elevation;
            airport.latitude = airportJson.lat;
            airport.longitude = airportJson.lon;
            airport.state = airportJson.state;
            airport.tz = airportJson.tz;
            airports.push(airport);
        });
        var randomElement = airports[Math.floor(Math.random() * airports.length)];
        return randomElement;
    };
    Airport.prototype.distanceBetween = function (airport, unit) {
        if (unit === void 0) { unit = "K"; }
        var lat1 = this.latitude;
        var lon1 = this.longitude;
        var lat2 = airport.latitude;
        var lon2 = airport.longitude;
        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit == "K") {
                dist = dist * 1.609344;
            }
            if (unit == "N") {
                dist = dist * 0.8684;
            }
            return dist;
        }
    };
    return Airport;
}());
exports.Airport = Airport;
//# sourceMappingURL=airport.js.map