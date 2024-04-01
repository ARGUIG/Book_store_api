const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler} = require("./middlewares/errors")
require("dotenv").config(); 
const connectToDB = require("./config/db");
const path = require("path")
const helmet = require("helmet")
const cors = require("cors")

// connection to DB
connectToDB()

// init app
const app =express();

// Static folder
app.use(express.static(path.join(__dirname,"images")))

// Apply middlewares
app.use(express.json()); 
app.use(express.urlencoded({extended:false})) // expressJS doesn't know urlencoded that comes from ejs(form)
app.use(logger);

// helmet
app.use(helmet())

// cors policy
app.use(cors())

// set view engine
app.set('view engine', 'ejs')

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors",require("./routes/authors"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));
app.use("/password",require("./routes/password"));
app.use("/api/upload",require("./routes/upload"));


// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// create server
const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));