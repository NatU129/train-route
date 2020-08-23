import fs from 'fs';

import Graph from 'graph-data-structure';

export class TrainsRoute {

    private route = Graph();

    public constructor() {
        this.route.addNode('A');
        this.route.addNode('B');
        this.route.addNode('C');
        this.route.addNode('D');
        this.route.addNode('E');
        this.route.addNode('F');
        this.route.addNode('G');
        this.route.addNode('H');
        this.route.addNode('I');
        this.route.addNode('J');

        this.route.addEdge('A', 'B', 5);
        this.route.addEdge('A', 'D', 15);
        this.route.addEdge('B', 'C', 5);
        this.route.addEdge('C', 'D', 7);
        this.route.addEdge('E', 'F', 5);
        this.route.addEdge('F', 'G', 5);
        this.route.addEdge('G', 'H', 10);
        this.route.addEdge('G', 'J', 20);
        this.route.addEdge('H', 'I', 10);
        this.route.addEdge('I', 'J', 5);

        // console.log(this.route.serialize());

        // console.log(this.route.shortestPath('A', 'B'));
        // console.log(this.route.shortestPath('A', 'C'));
        // console.log(this.route.shortestPath('E', 'J'));
        // console.log(this.route.shortestPath('A', 'D'));
        // console.log(this.route.shortestPath('A', 'J'));
    }

    public getNumberOfStation() {
        return this.route.nodes().length;
    }

    public createRouteFromCSV(filePath: string) {
        fs.readFileSync(filePath);
    }

    public getRoute(from: string, to: string){
        const result: { stop: number, time: number} = { stop: 0, time: Infinity};
        try {
            const route = this.route.shortestPath(from, to);
            result.stop = route.length - 2;
            result.time = route.weight || Infinity;
        } catch(e) {
            // no route found
        }
        return result;
    }

}


const trainRoute = new TrainsRoute();
const route = trainRoute.getRoute('A', 'J');
console.log(route);