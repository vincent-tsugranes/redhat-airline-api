import airportData from '../..//data/airports.json';

export class Airport{
    iata: string = "";
    icao: string = "";
    name: string = "";
    city: string = "";
    state: string = "";
    country: string = "";
    tz: string = "";
    elevation: number = 0;
    latitude: number = 0;
    longitude: number = 0;

    //coordinates: Coordinates = [this.lat, this.lon];

    random(){
        let airports :Airport[] = new Array<Airport>();
        airportData.airports.forEach(airportJson => {
            let airport : Airport = new Airport();
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

        const randomElement = airports[Math.floor(Math.random() * airports.length)];
        return randomElement;
    }

    distanceBetween(airport :Airport, unit :string = "K"){
        let lat1 = this.latitude;
        let lon1 = this.longitude;
        let lat2 = airport.latitude;
        let lon2 = airport.longitude;

        if ((lat1 == lat2) && (lon1 == lon2)) {
            return 0;
        }
        else {
            var radlat1 = Math.PI * lat1/180;
            var radlat2 = Math.PI * lat2/180;
            var theta = lon1-lon2;
            var radtheta = Math.PI * theta/180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            if (dist > 1) {
                dist = 1;
            }
            dist = Math.acos(dist);
            dist = dist * 180/Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit=="K") { dist = dist * 1.609344 }
            if (unit=="N") { dist = dist * 0.8684 }
            return dist;
        }
    }

}

