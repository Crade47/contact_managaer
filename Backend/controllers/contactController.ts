import type { Request, Response } from "express";
import type { CustomRequest } from "../middleware/validateTokenHandler";
interface reqBody  {
    name: string,
    email: string,
    phone: string
}

//Contacts
const Contact = require('../models/contactModel')
const asyncHandler = require('express-async-handler');

//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getContacts = asyncHandler(async (req:CustomRequest,res:Response)=>{
    const contacts = await Contact.find({ user_id: req.user.id });
    res.status(200).json(contacts); 
});

//@desc Get a contact
//@route GET /api/contacts/:id
//@access private
const getContactById = asyncHandler(async (req:Request,res:Response)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }
    res.status(200).json(contact); 
});


//@desc Create a contact
//@route POST /api/contacts
//@access private
const createContact = asyncHandler(async (req:CustomRequest,res:Response)=>{
    const { name, email, phone }: reqBody = req.body;

    if (!name || !email || !phone) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }
    const contact = await Contact.create({
        name,
        email,
        phone,
        user_id: req.user.id
    })
    res.status(200).json(contact); 
});

//@desc Update a contact
//@route PUT /api/contacts/id
//@access private
const updateContact = asyncHandler(async (req:CustomRequest,res:Response)=>{

    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to update the contact");
        
    }

    const updatedContact = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        {new: true}
    );

    res.status(200).json(updatedContact); 
});

//@desc Delete a contact
//@route DELETE /api/contacts/id
//@access private
const deleteContact = asyncHandler(async (req:CustomRequest,res:Response)=>{
    const contact = await Contact.findById(req.params.id);
    if (!contact) {
        res.status(404);
        throw new Error("Contact not found")
    }

    if(contact.user_id.toString() !== req.user.id){
        res.status(403);
        throw new Error("User does not have permission to update the contact"); 
    }

    await Contact.deleteOne({ _id: req.params.id });
    res.status(200).json(contact);
    
});

module.exports = { getContacts, getContactById, createContact, updateContact, deleteContact }