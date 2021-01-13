import { Crewmember } from "./crewmember";
import { Airport } from "./airport";
import * as luxon from "luxon";
export declare class Flight {
    id: number;
    aircraft_registration: string;
    departure_airport: Airport;
    arrival_airport: Airport;
    distance: number;
    estimated_time_departure: luxon.DateTime;
    estimated_time_arrival: luxon.DateTime;
    crewmembers: Array<Crewmember>;
    duration(): luxon.Duration;
    constructor(id: number);
}
