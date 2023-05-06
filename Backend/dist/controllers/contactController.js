"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
//Contacts
const Contact = require('../models/contactModel');
const asyncHandler = require('express-async-handler');
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contacts = yield Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts);
}));
//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContactById = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    res.status(200).json(contact);
}));
//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, email, phone } = req.body;
    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = yield Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    });
    res.status(200).json(contact);
}));
//@desc Update a contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update the contact");
    }
    const updatedContact = yield Contact.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updatedContact);
}));
//@desc Delete a contact
//@route DELETE /api/contacts/id
//@access private
const deleteContact = asyncHandler((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const contact = yield Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found");
    }
    if (contact.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("User does not have permission to update the contact");
    }
    yield Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
}));
module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact };
