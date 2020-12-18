import { Crewmember } from "./crewmember"
import { Airport } from "./airport";

export class Flight {
    id: number = 0;
    departure_airport: Airport = new Airport();
    arrival_airport: Airport = new Airport();

    distance :number = 0;

    estimated_time_departure: Date = new Date();
    estimated_time_arrival: Date = new Date();

    crewmembers: Array<Crewmember> = new Array<Crewmember>();

    constructor(id: number) {
        this.id = id;
      }
}
