import crewData from '../..//data/crewmembers.json';

export class Crewmember {
    first_name: string = "";
    last_name: string = "";
    rating: string = "";
    base: string = "";

    random(){
        let crewmembers :Crewmember[] = new Array<Crewmember>();
        crewData.crewmembers.forEach(crewJson => {
            let crew : Crewmember = new Crewmember();
            crew.first_name = crewJson.first_name;
            crew.last_name = crewJson.last_name;
            crew.rating = crewJson.rating;
            crew.base = crewJson.base;
            
            crewmembers.push(crew);
        });

        const randomElement = crewmembers[Math.floor(Math.random() * crewmembers.length)];
        return randomElement;
    }
}