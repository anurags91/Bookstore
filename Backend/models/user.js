const mongoose = require("mongoose");
const user = new mongoose.Schema({
    username :{
        type:String,
        required:true,
        unique:true,
    },
    email :{
        type:String,
        required:true,
        unique:true,
    },
    password :{
        type:String,
        required:true,
    },
    address :{
        type:String,
        required:true,

    },
    avatar :{
        type:String,
        required:true,
        default:"https://cdn-icons-png.flaticon.com/128/3177/3177440.png",
    },
    role:{
        type:String,
        default:"user",
        enum:["user","admin"],  
    },
    favourites:[
        {
            type:mongoose.Types.ObjectId,
            ref:"book",
        },
    ],
    cart:[
        {
            type:mongoose.Types.ObjectId,
            ref:"book",
        },
    ],
    orders:[
        {
            type:mongoose.Types.ObjectId,
            ref:"Order",

        },
    ],
    
},
{
    timestamps:true
});
module.exports=mongoose.model("user",user);