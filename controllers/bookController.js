
const asyncHandler = require("express-async-handler");
const { Book , updateBookValidation, createBookValidation } = require("../models/Books");

/** 
 * @desc    Get all books
 * @route   /api/books/
 * @method  Get
 * @access  public
 */
const getAllBooks = asyncHandler(
    async (req,res) => {
        let booksList
        const {minPrice, maxPrice} = req.query
        if (minPrice && maxPrice){
            booksList = await Book.find({price : {$gte : minPrice , $lte : maxPrice}}).sort({ title : 1})
            .populate("author",["_id", "firstName", "lastName"])
            // .select("title author -_id");  select is for filter by attribute
        }else {
            booksList = await Book.find().sort({ title : 1}).populate("author",["_id", "firstName", "lastName"])
        }
        res.status(200).json(booksList);
    }
)

/** 
 * @desc    Get books by id
 * @route   ./api/books/
 * @method  Get
 * @access  public
 */
const getBookById = asyncHandler(
    async(req,res) => {
        const book = await Book.findById(req.params.id).populate("author",["_id" ,"fullName"]);
        if (book){
            res.status(200).json(book);
        } else{
            res.status(404).json({message : "Book not found"});
        }
    }
) 

/** 
 * @desc    Add book
 * @route   ./api/books/
 * @method  Post
 * @access  private (only admin)
 */
const addBook = asyncHandler(
    async (req,res) => {
        const {error} = createBookValidation(req.body);
        if (error){
            return res.status(400).json(error.details[0].message);
        }
        const book = new Book (
            {
                title : req.body.title,
                author : req.body.author,
                description : req.body.description,
                price : req.body.price,
                cover : req.body.cover
            }
        ) 
        const result = await book.save(); // it return a promise low success | low error
        res.status(201).json(result)}
)

/** 
 * @desc    Update book books by id
 * @route   ./api/books/
 * @method  Put
 * @access  private (only by admin)
 */
const updateBookById = async (req,res) => {
    const {error} = updateBookValidation(req.body)

    if (error){
        return res.status(400).json(error.details[0].message)
    }
        const book = await Book.findByIdAndUpdate(req.params.id , {
            $set: {
                title : req.body.title,
                author : req.body.author,
                description : req.body.description,
                price : req.body.price,
                cover : req.body.cover
            }
        },
        {
            new : true  // to view the object updated 
        })
    res.status(200).json(book);
}

/** 
 * @desc    Delete book books by id
 * @route   ./api/books/
 * @method  delete
 * @access  private (only by admin)
 */
const deleteBookByID = async (req,res) => {
    try {
        const b = await Book.findById(req.params.id);
        if (b) {
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json({ message : "book has been deleted"})
        }else{
            res.status(404).json({ message : "book not found"})
        }
    } catch (error) {
        res.status(500).json({ message : "something went wrong"})
    }
}

module.exports = {
    getAllBooks,
    getBookById,
    addBook,
    updateBookById,
    deleteBookByID
}