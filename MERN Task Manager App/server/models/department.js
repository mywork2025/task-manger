import mongoose from "mongoose";

const departmentschema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String
    }
})

const Department = mongoose.model('Department', departmentschema);

export default Department