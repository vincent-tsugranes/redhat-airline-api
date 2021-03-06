import * as express from 'express';
import * as luxon from 'luxon';
const url = require('url');

var faker = require('faker');

import { Flight } from '../entity/flight';
import { Crewmember } from '../entity/crewmember';
import { Airport } from '../entity/airport';

class ScheduleController {
  public router = express.Router();
  public path = '/schedule';

  constructor() {
    this.intializeRoutes();
  }

  public intializeRoutes() {
    this.router.get(this.path, this.getSchedule);
  }

  getSchedule = (request: express.Request, response: express.Response) => {
    const queryObject = url.parse(request.url, true).query;

    let startDate = luxon.DateTime.utc().startOf('day');
    let endDate = startDate.plus({ days: 7 });

    if ('start' in queryObject && 'end' in queryObject) {
      startDate = luxon.DateTime.fromISO(queryObject.start, { zone: 'utc' });
      endDate = luxon.DateTime.fromISO(queryObject.end, { zone: 'utc' });
    }

    let aircraftCount = 10;
    if ('aircraftCount' in queryObject) {
      aircraftCount = Number.parseInt(queryObject.aircraftCount);
    }

    let flightCount = 20;
    if ('flightCount' in queryObject) {
      flightCount = Number.parseInt(queryObject.flightCount);
    }

    const flights = generateFlights(
      aircraftCount,
      flightCount,
      startDate,
      endDate
    );
    response.send(flights);
  };
}

function generateFlights(
  aircraftCount: number,
  flightsCount: number,
  start: luxon.DateTime,
  end: luxon.DateTime
) {
  console.log(
    'Generating ' +
      aircraftCount +
      ' aircraft with ' +
      flightsCount +
      ' flights from ' +
      start.toString() +
      ' to ' +
      end.toString()
  );

  let flights = new Array<Flight>();

  for (var i = 0; i < aircraftCount; i++) {
    let aircraft_registration =
      'N' + faker.random.number({ min: 100, max: 999 }) + 'VT';

    //initialize the first flight
    let lastFlight = new Flight(faker.random.number({ min: 100, max: 9999 }));
    lastFlight.id = faker.random.number({ min: 100, max: 9999 }) + i * 10000;
    lastFlight.arrival_airport = new Airport().random();
    lastFlight.estimated_time_arrival = start.minus({ hours: 4 });

    for (var j = 0; j < flightsCount; j++) {
      let thisFlight: Flight = new Flight(lastFlight.id + 1);
      thisFlight.aircraft_registration = aircraft_registration;
      thisFlight.departure_airport = lastFlight.arrival_airport;
      thisFlight.arrival_airport = new Airport().random();
      while (
        thisFlight.arrival_airport.iata == thisFlight.departure_airport.iata
      ) {
        thisFlight.arrival_airport = new Airport().random();
      }

      thisFlight.estimated_time_departure = lastFlight.estimated_time_arrival.plus(
        { hours: faker.random.number({ min: 1, max: 6 }) }
      ); //add random between 1-4 for ground
      thisFlight.estimated_time_arrival = thisFlight.estimated_time_departure.plus(
        { hours: faker.random.number({ min: 3, max: 12 }) }
      ); //add random between 3-10 for flight
      thisFlight.distance = thisFlight.departure_airport.distanceBetween(
        thisFlight.arrival_airport
      );

      thisFlight.crewmembers.push(new Crewmember().random());
      thisFlight.crewmembers.push(new Crewmember().random());

      while (thisFlight.crewmembers[0].id == thisFlight.crewmembers[1].id) {
        thisFlight.crewmembers[1] = new Crewmember().random();
      }
      flights.push(thisFlight);
      lastFlight = thisFlight;
    }
  }
  return flights;
}

export default ScheduleController;
