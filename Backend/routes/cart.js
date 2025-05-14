const router = require("express").Router();
const User = require("../models/user");
const {authenticationToken} = require("./userAuth");

//put book to cart
router.put("/add-to-cart",authenticationToken,async(req,res)=>{
    try {
        const {bookid,id} = req.headers;
        const userData = await User.findById(id);
        const isBookinCart = userData.cart.includes(bookid);
        if(isBookinCart){
            return res.json({
                status:"Success",
                message:"Book already in cart",
            })
        }
        await User.findByIdAndUpdate(id,{
            $push:{cart:bookid},
        })
        return res.json({
            status:"Success",
            message:"Book addedd to cart",
        })
    } catch (error) {
       return res.status(500).json({message:"An error occured"});
    }
})
//remove from the cart
router.put("/remove-from-cart/:bookid",authenticationToken, async(req,res)=>{
    try {
        const {bookid} = req.params;
        const {id} = req.headers;
        await User.findByIdAndUpdate(id,{
            $pull:{cart:bookid},
        })
        return res.json({
            status:"Success",
            message:"book removed from cart",
        })
    } catch (error) {
        return res.status(500).json({message:"An error occurred"});
    }
})
//get a cart of the particular user
router.get("/get-user-cart",authenticationToken,async (req,res)=>{
    try {
        const {id} = req.headers;
        const userData = await User.findById(id).populate("cart");
        const cart =  userData.cart.reverse();
    return res.json({
        status:"Success",
        data:cart,
    })
    } catch (error) {
        console.log(error);
       return res.status(500).json({messsage:"An error ocuurred"}); 
    }
})
module.exports=router;