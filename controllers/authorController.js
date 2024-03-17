
const asyncHandler = require("express-async-handler");
const { Authors, validateCreateAuthor, validateUpdateAuthor } = require("../models/Authors");

/** 
 * @desc    Get all authors
 * @route   /api/books/
 * @method  Get
 * @access  public
 */
const getAllAuthors = asyncHandler (
    async (req,res) => {
        const {pageNumber} = req.query
        const authorsPerPage = 3;
        const authors  =   await Authors.find()
                                        .skip((pageNumber-1)*authorsPerPage)
                                        .limit(authorsPerPage);
        res.status(200).json(authors);
    }
)

/** 
 * @desc    Get author by id
 * @route   /api/authors/
 * @method  Get
 * @access  public
 */
const getAuthorByID = asyncHandler (
    async (req,res) => {
        const authors = await  Authors.findById(req.params.id);
        if (authors) {
            res.status(200).json(authors);
        } else {
            res.status(404).json({ message : "Author Not Found"});
        }
    }
)

/** 
 * @desc    Add author
 * @route   /api/books/
 * @method  POST
 * @access  private (only by admin)
 */
const addAuthor = asyncHandler(
    async (req,res) => {
        const {error} = validateCreateAuthor(req.body)
        if (error){
            return res.status(400).json(error.details[0].message)
        }
        const Author = new Authors ({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            nationality : req.body.nationality
            })
        const result = await Author.save(); // it return a promise low success | low error
        res.status(201).json(result);        
    }
)

/** 
 * @desc    Update author by id
 * @route   /api/authors/
 * @method  PUT
 * @access  private (only by admin)
 */
const updateAuthorByID = asyncHandler(
    async (req,res) => {
        const {error} = validateUpdateAuthor(req.body);
        if (error){
            return res.status(400).json(error.details[0].message)
        }else{
            const author = await Authors.findByIdAndUpdate(req.params.id , {
                $set : {
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    nationality : req.body.nationality
                }
            },
            {
                new : true  // to view the object updated 
            }
            )
            res.status(201).json(author);
        }
    }
)

/** 
 * @desc    Delete author by id
 * @route   /api/authors/
 * @method  DELETE
 * @access  private (only by admin)
 */
const deleteAuthorByID = asyncHandler(
    async (req,res) => {
        const b = Authors.findById(req.params.id);
        if (b){            
            await Authors.findByIdAndDelete(req.params.id)
            res.status(200).json({message : "AUthor has been deleted"});
        } else {
            res.status(404).json({message : " Author Not Found"});
        }
    }
)

module.exports = {
    getAllAuthors,
    getAuthorByID,
    addAuthor,
    updateAuthorByID,
    deleteAuthorByID,
}