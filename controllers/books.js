const mongoose = require('mongoose');
const Book = require('../models/bookSchema');

const getAll = async (req, res) => {
    try {
        const books = await Book.find();
        const response = {
            totalCount: books.length,
            books: books
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching books:', error);
        res.status(500).json({ error: 'An error occurred while fetching books' });
    }
};

const getSingle = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid ID format: please check that ID is valid' });
        }

        const book = await Book.findById(bookId);

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        res.status(200).json(book);
    } catch (error) {
        console.error('Error fetching book:', error);
        res.status(500).json({ error: 'An error occurred while fetching the book' });
    }
};

const createBook = async (req, res) => {
    try {
        // Find the maximum existing book ID
        const maxBook = await Book.findOne().sort({ BookID: -1 });
        const nextBookID = maxBook ? maxBook.BookID + 1 : 1;

        const book = new Book({
            BookID: nextBookID,
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            availabilityStatus: req.body.availabilityStatus
        });

        await book.save();
        const response = 'Book created successfully';
        res.status(200).json({ message: response });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation error, extract error messages and respond accordingly
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: 'Validation error', details: validationErrors });
        } else {
            console.error('Error creating book:', error);
            res.status(500).json({ error: 'An error occurred while creating the book' });
        }
    }
};

const updateBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid ID format: please check that ID is valid' });
        }

        const book = await Book.findByIdAndUpdate(bookId, {
            title: req.body.title,
            author: req.body.author,
            genre: req.body.genre,
            publicationYear: req.body.publicationYear,
            isbn: req.body.isbn,
            availabilityStatus: req.body.availabilityStatus
        });

        if (!book) {
            return res.status(404).json({ error: 'Book not found' });
        }

        const response = 'Book updated successfully';
        res.status(200).json({ message: response });
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Handle validation error, extract error messages and respond accordingly
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ error: 'Validation error', details: validationErrors });
        } else {
            console.error('Error creating book:', error);
            res.status(500).json({ error: 'An error occurred while creating the book' });
        }
    }
};

const deleteBook = async (req, res) => {
    try {
        const bookId = req.params.id;

        // Check if the provided ID is a valid ObjectId
        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ error: 'Invalid ID format: please check that ID is valid' });
        }

        const result = await Book.findByIdAndDelete(bookId);

        if (!result) {
            const response = 'No book, or book already deleted';
            return res.status(204).json({ message: response });
        }

        // Retrieve all remaining books and sort them by BookID
        const remainingBooks = await Book.find().sort({ BookID: 1 });

        // Update BookIDs
        for (let i = 0; i < remainingBooks.length; i++) {
            const newBookID = i + 1;
            await Book.findByIdAndUpdate(remainingBooks[i]._id, { BookID: newBookID });
        }

        const response = 'Book deleted successfully, and BookIDs updated';
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).json({ error: 'An error occurred while deleting the book' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createBook,
    updateBook,
    deleteBook
};
