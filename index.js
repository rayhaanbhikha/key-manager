const express = require('express');
const app = express();

const keys = require('./keys');

app.get("/", async (req, res) => {
    try {
        const service = req.headers["service"];
        const key = await keys.fetchKey(service)
        console.log("service: ", service);
        console.log("key: ", key);
        res.send("hello world");
    } catch (error) {
        console.log(error.message)
        res.send(error.message)
        res.status(404)
    }
})

app.get("/all", (req, res) => {
    keys.listKeys();
    res.send("all keys")
})

app.listen(3000, () => console.log("Server start listening"))