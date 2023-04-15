import express from "express";
const router = express.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require("../controllers/contactController")
const validateToken = require('../middleware/validateTokenHandler')
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);

module.exports = router;