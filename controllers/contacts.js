const mongodb = require('../data/database');
const ObjectId = require('mongodb').ObjectId;
const Contact = require('../models/contactSchema');

const getAll = async (req, res) => {
    try {
        const contacts = await Contact.find();
        const response = {
            totalCount: contacts.length,
            contacts: contacts
        };
        res.status(200).json(response);
    } catch (error) {
        console.error('Error fetching contacts:', error);
        res.status(500).json({ error: 'An error occurred while fetching contacts' });
    }
};

const getSingle = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findById(contactId);

        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        res.status(200).json(contact);
    } catch (error) {
        console.error('Error fetching contact:', error);
        res.status(404).json({ error: 'Contact not found' });
    }
};

const createContact = async (req, res) => {
    try {
        const contact = new Contact({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        });

        await contact.save();
        const response = 'Contact created successfully';
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error creating contact:', error);
        res.status(500).json({ error: 'An error occurred while creating the contact' });
    }
};

const updateContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const contact = await Contact.findByIdAndUpdate(contactId, {
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            favoriteColor: req.body.favoriteColor,
            birthday: req.body.birthday
        });


        if (!contact) {
            return res.status(404).json({ error: 'Contact not found' });
        }

        const response = 'Contact updated successfully';
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error updating contact:', error);
        res.status(500).json({ error: 'An error occurred while updating the contact' });
    }
};

const deleteContact = async (req, res) => {
    try {
        const contactId = req.params.id;
        const result = await Contact.findByIdAndDelete(contactId);

        if (!result) {
            const response = 'No contact, or contact already deleted';
            return res.status(204).send(); // No content, as the contact was not found (or already deleted)
        }

        const response = 'Contact deleted successfully';
        res.status(200).json({ message: response });
    } catch (error) {
        console.error('Error deleting contact:', error);
        res.status(500).json({ error: 'An error occurred while deleting the contact' });
    }
};

module.exports = {
    getAll,
    getSingle,
    createContact,
    updateContact,
    deleteContact
};