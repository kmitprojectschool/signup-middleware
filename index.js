const express = require('express');
const app = express();
const cors = require('cors');
const db = require('./database')

const port = process.env.port || 5000 ;
app.listen(port);
app.use(cors())

app.use(express.json());

console.log('App is listening at port '+port);

//set response header
app.get('/', (req,res) => {
    res.statusCode = 200;
    console.log("get!!");
 res.send("hello!");
});

app.post('/user/login', (req, res) => {
  console.log(req);
  
    if(!req.body.username || !req.body.password){
      res.json({ success:false, error:"Send the parameters" });
      return;
    }  
    db.User.findOne({username:req.body.username}).then((user)=>{
      if(!user){
        res.json({ success:false, error:"User does not exist" });
      }
      else {
        if(user.password != req.body.password){
          res.json({ success:false, error:"password not correct" });
        }
        else{
          res.json({ success:true, username:user.username,role:user.role });
        }
  
      }
    }).catch((err)=>{
      res.json({ success:false, error:err });
    })
  });


app.post('/user/signup', (req, res) => {
  console.log("in user signup");  
    console.log(req);
    
      if(!req.body.username || !req.body.password){
        res.json({ success:false, error:"Send the username and password parameters" });
        return;
      }  
      db.User.findOne({username:req.body.username}).then((user)=>{
        if(!user){
          db.User.create({
            username: req.body.username,
            password : req.body.password,
            role:req.body.role
          }).then(
            (user) => {
              console.log("----------saved");
              res.status(200).json({
                message: 'User added successfully!',
                username: user.username,
                role:user.role,
                success: true
              });

     

            }
          )
        }
        else {  //user with that username already exists        
            res.json({ success:false, error:"User already exists" });
            return;
          }
      }).catch((err)=>{
        console.log(err);
       // res.send(err);
        res.json({ success:false, error:err });
      })
    });

  app.get('/user/tech', (req, res) => {
    console.log(req);   
    res.statusCode = 200;   
    db.Tech.find({}).then((tech)=>{
        res.json({ success:true,techdetails:tech });
          }
      ).catch((err)=>{
        res.json({ success:false, error:err });
      })
    });

//REST API - Representational State Transfer
//CRUD Operations


//const url = `mongodb+srv://student:kmit123@cluster0.mwifk43.mongodb.net/himalayas?retryWrites=true&w=majority`;
