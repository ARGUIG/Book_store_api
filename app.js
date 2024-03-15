const express = require("express");
const logger = require("./middlewares/logger");
const { notFound, errorHandler} = require("./middlewares/errors")
require("dotenv").config(); 
const connectToDB = require("./config/db");

// connection to DB
connectToDB()

// init app
const app =express();

// Apply middlewares
app.use(express.json()); 
app.use(logger);

// routes
app.use("/api/books", require("./routes/books"));
app.use("/api/authors",require("./routes/authors"));
app.use("/api/auth",require("./routes/auth"));
app.use("/api/users",require("./routes/users"));

// Error handler middlewares
app.use(notFound);
app.use(errorHandler);

// create server
const PORT = process.env.PORT || 8000 ;
app.listen(PORT, () => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));