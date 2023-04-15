"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
const validateToken = require('../middleware/validateTokenHandler');
const { registerUser, loginUser, currentUser } = require('../controllers/userController');
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/current", validateToken, currentUser);
module.exports = router;
