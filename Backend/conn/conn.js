const mongoose = require("mongoose");

const conn = async () =>
{
    try{
        await mongoose.connect(`${process.env.URI}`);
        console.log("Connected to the database");
    }
   catch(error) {
    console.log(error);

    }
}
conn();