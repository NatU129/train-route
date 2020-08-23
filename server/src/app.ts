import fs from 'fs';
import { exit } from 'process';
import readline from 'readline';

import express from 'express';

import { TrainRoute } from './models/trainRoute';

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const app = express();

let trainRoute: TrainRoute;

const filePath = process.argv[2] // get file path from argument

try {
    const content = fs.readFileSync(filePath, {encoding:'utf8', flag:'r'});

    trainRoute = new TrainRoute(content.split('\n'));
} catch(err) {
    console.error('Error: something wrong with the file: %s, program exits', filePath);
    exit(0);
}

const askForInput = (query: string) => {

    return new Promise<string>(resolve => rl.question(query, ans => {
        resolve(ans);
    }))
}

const start = async() => {
    while (true) {
        const source = await askForInput("What station are you getting on the train?: ");
        const destination = await askForInput("What station are you getting off the train?: ");

        const route = trainRoute.getRoute(source, destination);
        
        if (route.time === Infinity) {
            console.log(`There is no route from %s to %s \n`, source, destination);
            
        } else {
            console.log(`Your trip from %s to %s includes %d stops and will take %d minutes \n`, source, destination, route.stop, route.time);
        }
    }
}

app.use('/routes', (req: any, res: any) => {
    res.json(trainRoute.getRoutes());
})

const server = app.listen(10300, async function () {
    const port = (server.address() as any).port;
    console.log('listening at: ', port, '\n-----------------------\n');

    // wait for use input
    start();
});
