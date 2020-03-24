const express = require('express');
const app = express();

const keys = require('./KeyManager');

app.get("/", async (req, res, next) => {
    try {
        const service = req.headers["service"];
        const key = await keys.fetchKey(service)
        console.log("service: ", service);
        console.log("key: ", key);
        res.send("hello world");
    } catch (error) {
        return next(error)
    }
})

app.get("/keys", (req, res, next) => {
    try {
        const k = keys.listKeys();
        res.json(k)
    } catch (error) {
        return next(error)
    }
})

app.use((error, req, res, next) => {
    res.status(404).send({ error: error.message })
})

app.listen(3000, () => console.log("Server start listening"))