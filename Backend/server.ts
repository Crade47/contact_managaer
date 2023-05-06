import express from 'express';
const dotenv = require('dotenv').config();
const errorHandler = require('./middleware/errorHandler');
const connectDb = require('./config/dbConnection')
const app = express();
const cors = require('cors')
const port = Number(process.env.PORT) || 5000;

connectDb();

app.use(cors());
app.use(express.json());
app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use(errorHandler);
app.listen(port,()=>{
    console.log(`Server running on port ${port}`);
})

module.exports = app;