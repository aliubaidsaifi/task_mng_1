const express=require("express");
require('./db/config');
const LoginSchema=require("./db/user");
const taskModel=require("./db/task");
const app=express();
const cors=require("cors");
app.use(cors());
app.use(express.json());
const {ObjectId } = require('mongodb');

app.post('/login',  async(req, res) => {
 const data= new LoginSchema(req.body)
 const result=await data.save();
 res.send(result);
});
// //read
app.get('/getAll/task',async(req,res)=>{
    const data = await taskModel.find({});
    res.json({success:true,data:data})
    console.log(data);
})

// //create//save data to mongodb
app.post('/create/task',async(req,res)=>{ 
    console.log(req.body);
    const data = new taskModel(req.body);
    await data.save();
    res.json({success:true,msg:"Task Create Successfully"});
})
// //update
app.put('/task/update/:id',async(req,res)=>{ 
    const {_id, ...rest } = req.body;
    const data =await taskModel.updateOne({_id:new ObjectId(_id)},rest)
    res.json({success:true,msg:"Task Update  Successfully",data:data});
})
// //delete
app.delete('/task/delete/:id',async(req,res)=>{
    const id = req.params.id;
    const data = await taskModel.deleteOne({_id:id});
    res.send({success:true,msg:"Task Delete Successfully",data:data})
})
const port = process.env.PORT ||5000;
app.listen(port, ()=>{
    console.log(`my port is running is ${5000}`);
})