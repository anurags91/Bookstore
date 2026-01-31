const router = require("express").Router();
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const Book = require("../models/book")
const { authenticationToken } = require("./userAuth")

//add book admin
router.post("/add-book", authenticationToken, async (req, res) => {
    try {
        const { id } = req.headers;
        const user = await User.findById(id);
        if (user.role !== "admin") {
            return res.status(400).json({ message: "You are authorized for this task " });
        }
        const book = new Book({
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,
        });
        await book.save();
        res.status(200).json({ message: "Book added successfully" });
    }
    catch (error) {
        console.error("Error while adding book:", error); // log real error
        res.status(500).json({ message: "Internal server error" });
    }

});

//update book
router.put("/update-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndUpdate(bookid, {
            url: req.body.url,
            title: req.body.title,
            author: req.body.author,
            price: req.body.price,
            desc: req.body.desc,
            language: req.body.language,

        })
        return res.status(200).json({ message: "Book updated successfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal server error" });
    }
})

//delete the book
router.delete("/delete-book", authenticationToken, async (req, res) => {
    try {
        const { bookid } = req.headers;
        await Book.findByIdAndDelete(bookid);
        return res.status(200).json({ message: "Book Deleted Suuucessfully" });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({ message: "An error occured" });
    }
})

router.get("/get-all-book", async (req, res) => {
    try {

        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        // console.log("Page:", page, "Limit:", limit, "Skip:", skip);  // 🟢 Debug line
        const search = req.query.search || "";

        // Create filter for searching by title or author
        const filter = search
            ? {
                $or: [
                    { title: { $regex: search, $options: "i" } },  // case-insensitive
                    { author: { $regex: search, $options: "i" } }
                ]
            }
            : {};
        // count total books
        const totalBooks = await Book.countDocuments(filter);

        // fetch books with skip & limit
        const books = await Book.find(filter)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit);
        // console.log("Books fetched:", books.length);
        return res.json({
            status: "Success",
            data: books,
            currentPage: page,
            totalPages: Math.ceil(totalBooks / limit),
            totalBooks: totalBooks,
        });
    }
    catch (error) {

        return res.status(500).json({ message: "An error occured" });
    }
})

//get recently addedd books limit 4
router.get("/get-recent-books", async (req, res) => {
    try {
        const books = await Book.find().sort({ created: -1 }).limit(4);
        return res.json({
            status: "Success",
            data: books,
        })
    } catch (error) {
        return res.status(500).json({ message: "An error occured" });
    }
})

//get book by id
router.get("/get-book-by-id/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const book = await Book.findById(id);
        return res.json({
            status: "Success",
            data: book,
        })
        
    } catch (error) {
        return res.status(500).json({ message: "An error ocuured" });
    }
})
module.exports = router;