const mongoose=require("mongoose");
mongoose.connect("mongodb+srv://mohdubaid9456:Ali12345@cluster0.2kryjtb.mongodb.net/?retryWrites=true&w=majority")
.then(()=>{console.log("connect to db");})
.catch((err)=>{console.log(err);})

require('./task');
require('./user');
