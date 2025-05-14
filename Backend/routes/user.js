const router = require("express").Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {authenticationToken} = require("./userAuth")
const Order = require ("../models/order")
//sign-up
router.post("/sign-up", async (req, res) => {
  try {
    // console.log("📥 Signup request body:", req.body);
    const { username, email, password, address } = req.body;

    //check username length is more than 3
    if (username.length < 3) {
      return res
        .status(400)
        .json({ message: "Username length should be greater than 4" });
    }
    //check username already exits?
    const existingUser = await User.findOne({ username: username });
    if (existingUser) {
      return res.status(400).json({ message: "Username already exits" });
    }
    //check email already exist?
    const existingEmail = await User.findOne({ email: email });
    if (existingEmail) {
      return res.status(400).json({ message: "Email already exits" });
    }

    //check password length is greater than 6
    if (password.length <= 5) {
      return res
        .status(400)
        .json({ message: "Password length should be greater than 5" });
    }
    const hashPass = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: username,
      email: email,
      password: hashPass,
      address: address,
    });
    await newUser.save();
    return res.status(200).json({ message: "Signup Successfully" });
  } catch (error) {
    
    res.status(500).json({ message: "Internal server error" });
  }
});
// sign-in
router.post("/sign-in", async (req, res) => {
  try {
    const { email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (!existingUser) {
      res.status(400).json({ message: "Invalid credentials" });
    }
    await bcrypt.compare(password, existingUser.password, (err, data) => {
      if (data) {
        const authClaims = [
          {
            name: existingUser.email,
          },
          {
            role: existingUser.role,
          },
        ];
        const token = jwt.sign({ authClaims }, "bookstore123", {
          expiresIn: "30d",
        });
        res
          .status(200)
          .json({
            id: existingUser._id,
            role: existingUser.role,
            token: token,
          });
      } else {
        res.status(400).json({ message: "Invalid Credential" });
      }
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
});

//get user information
router.get("/get-user-information",authenticationToken, async(req,res)=>{
    try{
const {id} = req.headers;
const data = await User.findById(id).select("-password");
return res.status(200).json(data);
    }
    catch(error){
        res.status(500).json({message:"Internal server error"});
    }
})

// update address
router.put("/update-address",authenticationToken, async (req,res)=>{
    try{
        const {id} = req.headers;
        const {address} = req.body;
        await User.findByIdAndUpdate(id,{address:address});
        return res.status(200).json({message:"Address updated successfully"});
    }
    catch(error)
    {
        res.status(500).json({message:"Internal server error"});
    }
})
module.exports = router;
