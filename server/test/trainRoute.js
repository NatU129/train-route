const assert = require('assert');

const TrainRoute = require('../src/models/trainRoute').TrainRoute;

const routes = [
    'A,B,5',
    'B,C,5',
    'C,D,7',
    'A,D,15',
    'E,F,5',
    'F,G,5',
    'G,H,10',
    'H,I,10',
    'I,J,5',
    'G,J,20'
];

const trainRoute = new TrainRoute(routes);

describe('Train Route', function () {
    describe('Check properties', function () {
        it('should return 10 when get the number of station', function () {
            assert.equal(trainRoute.getNumberOfStations(), 10);
        });

        it('should return 10 when get the number of route', function () {
            assert.equal(trainRoute.getNumberOfRoutes(), 10);
        });
    });

    describe('Check functionalities', function () {
        it('should be 11 stations when add a new one', function () {
            trainRoute.addRoute('J', 'K', 5);
            assert.equal(trainRoute.getNumberOfStations(), 11);
        });

        it('should take 30 minutes and pass 2 stations from E to J', function () {
            const result = trainRoute.getRoute('E', 'J');

            assert.equal(result.time, 30);
            assert.equal(result.stop, 2);
        });
    });
});