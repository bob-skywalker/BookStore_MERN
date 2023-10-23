import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";

const app = express();

app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to MERN!")
})


mongoose 
    .connect(mongoDBURL)
    .then(()=> {
        console.log('APP connected to MongoDB');
        app.listen(PORT, () => {
            console.log(`App is listening to port: ${PORT}`);
        });
    })
    .catch((err) => {
        console.log(err)
    })

