import mongoose from "mongoose";

import {}  from 'dotenv/config'

//const uri = "mongodb+srv://shylureddyallam:9EdSAS7ZU5CXM2eK@cluster0.cspcivf.mongodb.net/Hello?retryWrites=true&w=majority"
const uri =process.env.MONGO_URI
mongoose.connect(uri).then(()=>console.log("***************************Connected to Mongodb ******************************"))
.catch((err)=>console.log(`##############Not Connected due to error below ##################\n${err}`))


const userSchema = mongoose.Schema({
    name :{type:String,required:true},
    email :{type:String,required:true},
    pwd  : {type:String,required:true}
})

const userModel = mongoose.model('GeneralUser',userSchema)

export default userModel