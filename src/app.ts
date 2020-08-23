import readline from 'readline';

import { TrainRoute } from './models/trainRoute';

// function askQuestion(query: string) {

//     return new Promise(resolve => rl.question(query, ans => {
//         rl.close();
//         resolve(ans);
//     }))
// }

// const ans = await askQuestion("Are you sure you want to deploy to PRODUCTION? ");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const trainRoute = new TrainRoute();
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