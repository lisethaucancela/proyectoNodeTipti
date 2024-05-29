'use strict'


module.exports = async (job, done) => {
    try {
        console.log("test job");
    }
    catch (error) {
        return done(error);
    }
}