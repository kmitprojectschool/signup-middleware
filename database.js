const mongoose = require("mongoose")

const url = 'mongodb+srv://student:student@cluster0.mwifk43.mongodb.net/backend?retryWrites=true&w=majority'
 const connectionParams={
    useNewUrlParser: true,
    useUnifiedTopology: true 
} 

mongoose.connect(url,connectionParams)
    .then( () => {
        console.log('Connected to database ')
    })
    .catch( (err) => {
        console.error(`Error connecting to the database. \n${err}`);
    })

    // User model
const userschema = new mongoose.Schema( {
    username: { type: String, unique:true, required:true, lowercase:true,trim:true },
    password: { type: String,required:true },
    role: { type: String,required:true }
},{collection:"users"});

exports.User=mongoose.model("User",userschema)


// Tech model
  const techschema = new mongoose.Schema( {
    name: { type: String, unique:true, required:true, lowercase:true,trim:true },
    details: { type: String,required:true }
},{collection:"techs"});

exports.Tech=mongoose.model("Tech",techschema)
