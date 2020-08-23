import Graph from 'graph-data-structure';

export class TrainRoute {

    private routes = Graph();

    // take array of route ['A,B,5', 'C,D,10', ...] as param
    public constructor(routes: string[]) {
        routes.forEach(route => {
            const [src, des, length] = route.split(',');
            this.addRoute(src, des, +length);
        });
    }

    public getNumberOfStations() {
        return this.routes.nodes().length;
    }

    public getNumberOfRoutes() {
        return this.routes.serialize().links.length;
    }

    public getRoutes() {
        return this.routes.serialize();
    }

    public addRoute(source: string, destination: string, length: number) {
        this.routes.addNode(source);
        this.routes.addNode(destination);
        
        this.routes.addEdge(source, destination, length);
    }

    public getRoute(from: string, to: string){
        const result: { stop: number, time: number} = { stop: 0, time: Infinity};
        try {
            const route = this.routes.shortestPath(from, to);
            result.stop = route.length - 2; // remove starting and ending stations
            result.time = route.weight || Infinity;
        } catch(e) {
            // no route found
        }

        return result;
    }

}
