import mongoose from "mongoose";

const uri = "mongodb+srv://FullStack:Conestoga@cluster0.1ua8had.mongodb.net/CostCoUserz?retryWrites=true&w=majority&appName=Cluster0";
mongoose.connect(uri).then(()=>console.log("***************************Connected to Mongodb ******************************"))
.catch((err)=>console.log(`##############Not Connected due to error below ##################\n${err}`))


const userSchema = mongoose.Schema({
    name :{type:String,required:true},
    email :{type:String,required:true},
    pwd  : {type:String,required:true}
})

const userModel = mongoose.model('GeneralUser',userSchema)

export default userModel