const router = require("express").Router();
const User = require("../models/user");
const {authenticationToken} = require("./userAuth");

//add book to favourite
router.put("/add-book-to-favourite",authenticationToken, async(req,res)=>{
   try {
    const {bookid,id} = req.headers;
    const userData = await User.findById(id);
    const isBookFavourite = userData.favourites.includes(bookid);
    if(isBookFavourite){
        return res.status(200).json({message:"Book already in favourites"})
    }
    await User.findByIdAndUpdate(id,{$push:{favourites:bookid}});
    return res.status(200).json({message:"Book addedd to favourites"})
   } catch (error) {
    res.status(500).json({message:"Internal server error"});
   } 
})

//delete book from favourite
router.put("/remove-book-from-favourite",authenticationToken, async(req,res)=>{
    try {
     const {bookid,id} = req.headers;
     const userData = await User.findById(id);
     const isBookFavourite = userData.favourites.includes(bookid);
     if(isBookFavourite){
        await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}});
     }
     return res.status(200).json({message:"Book removed to favourites"})
    } catch (error) {
     res.status(500).json({message:"Internal server error"});
    } 
 })

 //get all favourite books
 router.get("/get-favourite-books",authenticationToken, async(req,res)=>{
    try {
     const {id} = req.headers;
     const userData = await User.findById(id).populate("favourites");
     const FavouriteBooks = userData.favourites;
     return res.json({
        status:"Success",
        data:FavouriteBooks,
     })
    } catch (error) {
     res.status(500).json({message:"Internal server error"});
    } 
 })
module.exports = router;
