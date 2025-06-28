import mongoose from "mongoose";
const feedbackSchema=new mongoose.Schema({
    name:{type:String,required:true},
    email:{type:String,required:true},
    message:{type:String,required:true},
    rating:{type:Number,required:true,min:1,max:5},
})
const Feedback=mongoose.model("Feedback",feedbackSchema);
export default Feedback;