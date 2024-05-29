'use strict'

const Queue = require('bull');

const myQueue = new Queue('myQueue', {

    redis: {
        host: 'redis-13363.c93.us-east-1-3.ec2.redns.redis-cloud.com',
        port: 13363,
        password: 'nQ6H4FpoCX42qj6Nnpxq22lDR3SXLdrF',
    }
});

myQueue.process(async (job) => {
    console.log(`Procesando Tarea con ID ${job.id}`);
    await new Promise(resolve => setTimeout(resolve, 3000));
    console.log(`Tarea completa para ID ${job.id}`);
});

for (let i = 0; i < 5; i++) {
    myQueue.add({ index: i });
}

