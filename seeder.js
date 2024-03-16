const {Book} = require("./models/Books")
const {books} = require("./data")
const connectToDB = require("./config/db")
require("dotenv").config()

// Connect DB
connectToDB()

// Import books(seeding database)
const importBooks = async () => {
    try {
        await Book.insertMany(books)
        console.log("books inserted")
    } catch (error) {
        console.log(error)
        process.exit(1) // cut connection betwwn deeders.js & DB
    }
}

// Remove books
const removeBooks = async () => {
    try {
        await Book.deleteMany()
        console.log("books Removed")
    } catch (error) {
        console.log(error)
        process.exit(1) // cut connection betwwn deeders.js & DB
    }
}

if (process.argv[2] === "-import"){
    importBooks()
} else if (process.argv[2] === "-remove"){
    removeBooks()
}