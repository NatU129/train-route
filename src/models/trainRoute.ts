import fs from 'fs';
import readline from 'readline';
import { exit } from 'process';

import Graph from 'graph-data-structure';

export class TrainsRoute {

    private route = Graph();

    // should take array of route as param
    public constructor() { }

    public getNumberOfStation() {
        return this.route.nodes().length;
    }

    public getNumberOfRoute() {
        return this.route.serialize().links.length;
    }

    public addRoute(source: string, destination: string, length: number) {
        this.route.addNode(source);
        this.route.addNode(destination);
        
        this.route.addEdge(source, destination, length);
    }

    public createTrainRouteFromFile(filePath: string) {
        try {
            const content = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

            content.split('\n').forEach(line => {
                const route = line.split(',');
                this.addRoute(route[0], route[1], +route[2]);
            });
        } catch(err) {
            console.error('Error: ', err);
            exit(1);
        }
    }

    public getRoute(from: string, to: string){
        const result: { stop: number, time: number} = { stop: 0, time: Infinity};
        try {
            const route = this.route.shortestPath(from, to);
            result.stop = route.length - 2; // remove starting and ending stations
            result.time = route.weight || Infinity;
        } catch(e) {
            // no route found
        }

        return result;
    }

}

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const trainRoute = new TrainsRoute();
trainRoute.createTrainRouteFromFile(process.argv[2]); // file path from argument

rl.question("What station are you getting on the train?: ", source => {
    rl.question("What station are you getting off the train?: ", destination => {
        const route = trainRoute.getRoute(source, destination);

        if (route.time === Infinity) {
            console.log(`There is no route from %s to %s`, source, destination);
            
        } else {
            console.log(`Your trip from %s to %s includes %d stops and will take %d minutes`, source, destination, route.stop, route.time);
        }

        rl.close();
    });
});

