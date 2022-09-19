import  express, { request ,response}  from "express";
import mongoose from 'mongoose';
import  Customer  from "../server1/model.js";


const  CONNECTION_STRING ='mongodb://127.0.0.1:27017/skillSafari?directConnection=true&serverSelectionTimeoutMS=2000&appName=mongosh+1.5.4';


const app  = express();
app.use(express.json());



app.use('/createCustomer',async(request,response)=>{
    var data = await Customer.create({
        cname:"gobi",
        email:"gobi@123",
        dob:"1999-06-19",
        age:23,
        salary:15000,
        did:1,
        desgination:"web app developer",
        pincode:630561,
        pancard:"PAN00656",
        mobile:1234567890,
        status:0,
        authkey:0

    });
    response.status(200).json(data)
})

app.use('/loginCustomer',async(request,response)=>{
    var data = await Customer.find({$and:[{email:request.body.email},{mobile:request.body.mobile}]});
    if (data.email===request.email && data.mobile===request.mobile) {
       // console.log(data.email);
    response.status(200).json({message:"login sucessfully!"})
    } else {
    response.status(200).json({message:"login error!"})     
    }
})

app.use('/findCustomer',async(request,response)=>{
    var data = await Customer.find({cname:request.body.cname});
    response.status(200).json(data)
})

app.use('/updateCustomer/:cname',async(request,response)=>{  
try{
    await Customer.updateOne({cname:request.params.cname},{$set:{
        email:request.body.email
    }});
    var update= await Customer.find({cname:request.params.cname});
    response.send(update);
}catch(error){
        response.status(200).json(error.message);
    }
})

app.use('/dropCustomer',async(request,response)=>{
    var data = await Customer.deleteOne({$unset:{
        cname:request.body.cname
      
    }});
    response.status(200).json(data)
})

mongoose.connect(CONNECTION_STRING)
.then(()=>{
    app.listen(3030,()=>{console.log("completed!");})
})
.catch((error)=>{
    console.log(error);
})


