import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import booksRoutes from "./routes/booksRoutes.js";
import cors from 'cors';

const { Schema } = mongoose;  

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

const app = express();

app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));

// Middleware for handling CORS Policy
app.use(cors());

app.use('/books', booksRoutes);


//setting default URL path 
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to MERN!")
})



