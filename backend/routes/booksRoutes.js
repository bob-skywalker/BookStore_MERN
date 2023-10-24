import express from 'express';
import {Book} from '../models/bookModel.js';


const router = express.Router();
//Route for save a new book  
router.post('/', async (req, res) => {
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
router.get('/', async (req, res) => {
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
router.get('/:id', async(req, res) => {
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
router.put('/:id', async(req, res) => {
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


router.delete('/:id', async(req, res)=> {
    try {
        const { id } = req.params;
        const book = Book.findByIdAndRemove(id);

        if (!book) {
            res.status(404).send({message: 'Book not found'});
        }
        return res.status(200).json({message: 'Book successfully deleted!'});

    } catch(err) {
        console.log(err);
        res.status(500).send({message: err.message});
    }
});

export default router;