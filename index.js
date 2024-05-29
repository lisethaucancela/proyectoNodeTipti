const express = require('express');
const app = express();
const port = 3700;

app.get("/", (req, res) => {
    console.log("Get ejecutado en raiz");
    res.send("Hola mundo endpoint");
});

app.listen(port, () => {
    console.log("Servidor ejecutado en " + port);
});