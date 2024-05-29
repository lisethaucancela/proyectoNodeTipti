'use strict'

var controller = {
    testcache: function (req, res) {

        let saludos =[];

        for (let index = 0; index < 10; index++) {
            console.log(index);
            saludos.push('Hola ' + index);
        }

        return res.status(200).send({
            status: 200,
            messages: 'test cache',
            data: saludos
        });
    },

    fibo: function (req, res) {
        let n = 10000;
        var fib = [0, 1];
        for (var i = 2; i <= n; i++) {
            fib[i] = fib[i - 1] + fib[i - 2];
        } 
        return res.status(200).send({
            status: 200,
            messages: 'test fibo',
            data: fib.slice(0, n + 1)
        });
    }

}

module.exports = controller;