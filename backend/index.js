import express from "express";
import { PORT } from "./config.js";
import { mongoDBURL } from "./config.js";
import mongoose from "mongoose";
import { Book } from "./models/bookModel.js";

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

// Routes to get All Books from Mongoose 
app.get('/books', async (req, res) => {
    try{
        const books = await Book.find({});
        return res.status(200).json({
            count: books.length,
            data: books
        });

    } catch (err){
        console.log(err.message);
        res.status(500).send({message: err.message});
    }
});

// Routes to get one book from Mongoose 
app.get('/books/:id', async(req, res) => {
    try{
        const { id } = req.params;

        const book = await Book.findById(id);
        return res.status(200).json(book);

    } catch(err) {
        console.log(err)
        res.status(500).send({message: err.message});
    }
});

// Routes for Update a Book 
app.put('/books/:id', async(req, res) => {
    try{
        if (!req.body.title ||
            !req.body.author ||
            !req.body.publishYear
            ) {
                return res.status(400).send({
                    message: 'Send all required fields: title, author, publishYear'
                });
            }
        const { id } = req.params;

        const book = await Book.findByIdAndUpdate(id, req.body);

        if (!book) {
            res.status(404).send({message: 'Book not found'});
        }

        return res.status(200).json({message: 'Book updated sucessfully.'});


    } catch(err) {
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

