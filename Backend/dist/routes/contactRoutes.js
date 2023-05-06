"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const { getContacts, getContactById, createContact, updateContact, deleteContact } = require("../controllers/contactController");
const validateToken = require('../middleware/validateTokenHandler');
router.use(validateToken);
router.route("/").get(getContacts).post(createContact);
router.route("/:id").get(getContactById).put(updateContact).delete(deleteContact);
module.exports = router;
