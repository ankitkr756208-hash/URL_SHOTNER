import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl }     from './controllers/url.js';

const app=express();

app.use(express.urlencoded({extended:true}))

mongoose.connect(
  "mongodb://localhost:27017/",
  { dbName: "NodejsMastery" }
)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

//rendering the ejs file
app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl :null})
})
//shorting url logic
app.post('/short',shortUrl)

//redirect to original url using short code: dynamic route
app.get('/:shortCode',getOriginalUrl);




const port=3000;
app.listen(port,()=>console.log(`server is running on ${port}`));