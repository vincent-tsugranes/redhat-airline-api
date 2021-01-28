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
var express = __importStar(require("express"));
var luxon = __importStar(require("luxon"));
var url = require('url');
var faker = require('faker');
var flight_1 = require("../entity/flight");
var crewmember_1 = require("../entity/crewmember");
var airport_1 = require("../entity/airport");
var ScheduleController = /** @class */ (function () {
    function ScheduleController() {
        this.router = express.Router();
        this.path = '/schedule';
        this.getSchedule = function (request, response) {
            var queryObject = url.parse(request.url, true).query;
            var startDate = luxon.DateTime.utc();
            var endDate = startDate.plus({ days: 7 });
            if ('start' in queryObject && 'end' in queryObject) {
                startDate = luxon.DateTime.fromISO(queryObject.start);
                endDate = luxon.DateTime.fromISO(queryObject.end);
            }
            var aircraftCount = 10;
            if ('aircraftCount' in queryObject) {
                aircraftCount = Number.parseInt(queryObject.aircraftCount);
            }
            var flightCount = 20;
            if ('flightCount' in queryObject) {
                flightCount = Number.parseInt(queryObject.flightCount);
            }
            var flights = generateFlights(aircraftCount, flightCount, startDate, endDate);
            response.send(flights);
        };
        this.intializeRoutes();
    }
    ScheduleController.prototype.intializeRoutes = function () {
        this.router.get(this.path, this.getSchedule);
    };
    return ScheduleController;
}());
function generateFlights(aircraftCount, flightsCount, start, end) {
    console.log('Generating ' + aircraftCount + ' aircraft with ' + flightsCount + ' flights from ' + start.toString() + ' to ' + end.toString());
    var flights = new Array();
    for (var i = 0; i < aircraftCount; i++) {
        var aircraft_registration = 'N' + faker.random.number({ min: 100, max: 999 }) + 'VT';
        //initialize the first flight
        var lastFlight = new flight_1.Flight(faker.random.number({ min: 100, max: 9999 }));
        lastFlight.id = faker.random.number({ min: 100, max: 9999 }) + (i * 10000);
        lastFlight.arrival_airport = new airport_1.Airport().random();
        lastFlight.estimated_time_arrival = start.minus({ hours: 4 });
        for (var j = 0; j < flightsCount; j++) {
            var thisFlight = new flight_1.Flight(lastFlight.id + 1);
            thisFlight.aircraft_registration = aircraft_registration;
            thisFlight.departure_airport = lastFlight.arrival_airport;
            thisFlight.arrival_airport = new airport_1.Airport().random();
            while (thisFlight.arrival_airport.iata == thisFlight.departure_airport.iata) {
                thisFlight.arrival_airport = new airport_1.Airport().random();
            }
            thisFlight.estimated_time_departure = lastFlight.estimated_time_arrival.plus({ hours: faker.random.number({ min: 1, max: 6 }) }); //add random between 1-4 for ground
            thisFlight.estimated_time_arrival = thisFlight.estimated_time_departure.plus({ hours: faker.random.number({ min: 3, max: 12 }) }); //add random between 3-10 for flight 
            thisFlight.distance = thisFlight.departure_airport.distanceBetween(thisFlight.arrival_airport);
            thisFlight.crewmembers.push(new crewmember_1.Crewmember().random());
            thisFlight.crewmembers.push(new crewmember_1.Crewmember().random());
            while (thisFlight.crewmembers[0].id == thisFlight.crewmembers[1].id) {
                thisFlight.crewmembers[1] = new crewmember_1.Crewmember().random();
            }
            flights.push(thisFlight);
            lastFlight = thisFlight;
        }
    }
    return flights;
}
exports.default = ScheduleController;
//# sourceMappingURL=schedulecontroller.js.map