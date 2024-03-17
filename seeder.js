const {Book} = require("./models/Books")
const {Authors} = require("./models/Authors")
const {books, authors} = require("./data")
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

// Import authors
const importAuthors = async () => {
    try {
        await Authors.insertMany(authors)
        console.log("authors inserted")
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
// Remove books
const removeAuthors = async () => {
    try {
        await Authors.deleteMany()
        console.log("authors Removed")
    } catch (error) {
        console.log(error)
        process.exit(1) // cut connection betwwn deeders.js & DB
    }
}

if (process.argv[2] === "-import-books"){
    importBooks()
} else if (process.argv[2] === "-remove-books"){
    removeBooks()
} else if (process.argv[2] === "-import-authors" ){
    importAuthors()
} else if (process.argv[2] === "-remove-authors" ){
    removeAuthors()
}