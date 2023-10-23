import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

const { Schema } = mongoose;  

const app = express();
app.use(express.json());


//setting default URL path 
app.get('/', (req, res) => {
    console.log(req)
    return res.status(234).send("Welcome to MERN!")
})

//Route for save a new book 
app.post('/books', async (req, res) => {
    try {
        if (
            !req.body.title || 
            !req.body.author || 
            !req.body.publishYear
        ) {
            return res.status(400).send({
                message: 'Send all required fields: title, author, publish year'
            })
        }
        const newBook = new Book({
            title: req.body.title, 
            author: req.body.author,
            publishYear: req.body.publishYear
        });

        const book = await Book.create(newBook);

        return res.status(201).send(book);

    } catch(err) {
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});


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

