'use strict'

const { myJob } = require('../workers/queues');

console.log(myJob);

var controller = {
    myJob: function (req, res) {
        myJob.add();
        console.log("myJob");
        return res.status(200).send({
            status: 200,
            message: "Job recibido",
        });
    }

}

module.exports = controller