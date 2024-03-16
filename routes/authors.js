const express = require("express");
const router = express.Router();
const asyncHandler = require("express-async-handler");
const { Authors, validateCreateAuthor, validateUpdateAuthor } = require("../models/Authors");
const {verifyTokenAndAdmin} = require("../middlewares/verifyToken")

/** 
 * @desc    Get all authors
 * @route   /api/books/
 * @method  Get
 * @access  public
 */
router.get( "/", asyncHandler (
    async (req,res) => {
        const authors = await Authors.find();
        res.status(200).json(authors);
    }
));

/** 
 * @desc    Get author by id
 * @route   /api/authors/
 * @method  Get
 * @access  public
 */
router.get( "/:id", asyncHandler (
    async (req,res) => {
        const authors = await  Authors.findById(req.params.id);
        if (authors) {
            res.status(200).json(authors);
        } else {
            res.status(404).json({ message : "Author Not Found"});
        }
    }
));

/** 
 * @desc    Add author
 * @route   /api/books/
 * @method  POST
 * @access  private (only by admin)
 */
router.post(
    "/", 
    verifyTokenAndAdmin,
    asyncHandler(
    async (req,res) => {
        const {error} = validateCreateAuthor(req.body)
        if (error){
            return res.status(400).json(error.details[0].message)
        }
        const Author = new Authors ({
            firstName : req.body.firstName,
            lastName : req.body.lastName,
            age : req.body.age,
            nationnality : req.body.nationnality
            })
        const result = await Author.save(); // it return a promise low success | low error
        res.status(201).json(result);        
    }
))

/** 
 * @desc    Update author by id
 * @route   /api/authors/
 * @method  PUT
 * @access  private (only by admin)
 */
router.put(
    "/:id", 
    verifyTokenAndAdmin,
    asyncHandler(
    async (req,res) => {
        const {error} = validateUpdateAuthor(req.body);
        if (error){
            return res.status(400).json(error.details[0].message)
        }else{
            const author = await Authors.findByIdAndUpdate(req.params.id , {
                $set : {
                    firstName : req.body.firstName,
                    lastName : req.body.lastName,
                    age : req.body.age,
                    nationnality : req.body.nationnality
                }
            },
            {
                new : true  // to view the object updated 
            }
            )
            res.status(201).json(author);
        }
    }
))

/** 
 * @desc    Delete author by id
 * @route   /api/authors/
 * @method  DELETE
 * @access  private (only by admin)
 */
router.delete(
    "/:id", 
    verifyTokenAndAdmin,
    asyncHandler(
    async (req,res) => {
        const b = Authors.findById(req.params.id);
        if (b){            
            await Authors.findByIdAndDelete(req.params.id)
            res.status(200).json({message : "AUthor has been deleted"});
        } else {
            res.status(404).json({message : " Author Not Found"});
        }
    }
))

module.exports = router;