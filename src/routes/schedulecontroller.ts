
import * as express from 'express';

var faker = require('faker');

import { Flight } from "../entity/flight";
import { Crewmember } from "../entity/crewmember";
import { Airport } from "../entity/airport";


class ScheduleController{
    public router = express.Router();
    public path = '/schedule';

    constructor() {
        this.intializeRoutes();
      }

    public intializeRoutes() {
        this.router.get(this.path, this.getSchedule);
       }

      getSchedule = (request: express.Request, response: express.Response) => {
        const aircraft = generateAircraft(5,10);
        response.send(aircraft);
      }

}


function generateAircraft(aircraftCount: number, flightsCount: number){
    let aircraft = [];
    
    for(var i=0; i<aircraftCount; i++){
        let aircraft_registration = 'N' + faker.random.number({min: 100, max: 999}) + 'VT';
        let flights = new Array<Flight>();

        //let departure_airport = ""
        //let arrival_airport = ""
        //let estimated_time_departure = faker.date.recent();
        //let estimated_time_arrival = 

//faker.date.recent();

//initialize the first flight
let lastFlight = new Flight(faker.random.number({min: 100, max: 9999}));
lastFlight.id = faker.random.number({min: 100, max: 9999})
lastFlight.arrival_airport = new Airport().random();
lastFlight.estimated_time_arrival = faker.date.recent();


        for(var j=0; j<flightsCount; j++){
            let thisFlight :Flight = new Flight(lastFlight.id +1);

            thisFlight.departure_airport = lastFlight.arrival_airport;
            thisFlight.arrival_airport = new Airport().random();
            thisFlight.estimated_time_departure = lastFlight.estimated_time_arrival; //add random between 1-4 for ground
            thisFlight.estimated_time_arrival = thisFlight.estimated_time_departure; //add random between 3-10 for flight 
            thisFlight.distance = thisFlight.departure_airport.distanceBetween(thisFlight.arrival_airport);

            flights.push(thisFlight);
            lastFlight = thisFlight;

        }
        aircraft.push({aircraft: aircraft_registration, flights: flights});

    }
    return aircraft;
}

export default ScheduleController;