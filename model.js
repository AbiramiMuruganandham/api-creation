import mongoose from "mongoose";

const schemaName = mongoose.Schema({
    name: String,
    cname: String,
    email: String,
    dob: Date,
    age: Number,
    salary: Number,
    did: Number,
    desgination: String,
    pincode: Number,
    pancard: String,
    mobile: Number,
    status: Number,
    authkey: Number
});

export default mongoose.model("Customer", schemaName);