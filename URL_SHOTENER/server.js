import express from 'express';
import mongoose from 'mongoose';
import { shortUrl,getOriginalUrl }     from './controllers/url.js';

const app=express();

app.use(express.urlencoded({extended:true}))

app.set('view engine', 'ejs');
app.set('views', './views');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/NodejsMastery';

//rendering the ejs file
app.get('/',(req,res)=>{
    res.render('index.ejs',{shortUrl :null})
})
//shorting url logic
app.post('/short',shortUrl)

//redirect to original url using short code: dynamic route
app.get('/:shortCode',getOriginalUrl);




const port=3000;

const startServer = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB Connected');

    app.listen(port, () => {
      console.log(`server is running on ${port}`);
    });
  } catch (error) {
    console.error('Failed to connect MongoDB. Start MongoDB service and retry.');
    console.error(error.message);
    process.exit(1);
  }
};

startServer();
