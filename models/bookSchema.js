const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema({
    BookID: {
        type: Number,
        required: [true, 'BookID is required'],
        unique: true
    },
    title: {
        type: String,
        required: [true, 'Title is required']
    },
    author: {
        type: String,
        required: [true, 'Author is required']
    },
    genre: {
        type: String,
        required: [true, 'Genre is required']
    },
    publicationYear: {
        type: Number,
        required: [true, 'Publication Year is required']
    },
    isbn: {
        type: String,
        required: [true, 'ISBN is required'],
        unique: true
    },
    availabilityStatus: {
        type: String,
        required: [true, 'Availability Status is required']
    }
});

const Book = mongoose.model('Book', bookSchema);

module.exports = Book;
