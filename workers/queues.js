'use strict'

const Queue = require('bull');

let redis = {
    host: 'redis-13363.c93.us-east-1-3.ec2.redns.redis-cloud.com',
    port: 13363,
    password: 'nQ6H4FpoCX42qj6Nnpxq22lDR3SXLdrF'
}

const {
    myJob: myJobWorker
} = require("./workers")

const myJob = new Queue('myJob', { redis });

myJob.process(1, (job, done) => myJobWorker(job, done));

module.exports ={
    myJob 
}
