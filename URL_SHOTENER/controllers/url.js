import {Url} from '../Models/Url.js';
import shortid from 'shortid';

export const shortUrl=async(req,res)=>{
    try {
        const longUrl=req.body.longUrl;
        const shortCode=shortid.generate();

        const shortUrl=`http://localhost:3000/${shortCode}`;

        //save to database
        const newUrl=new Url({
            shortCode,
            longUrl
        })
        await newUrl.save();

        console.log("short  saved= ",newUrl)
        res.render("index.ejs",{shortUrl})
    } catch (error) {
        console.error('Error while creating short URL:', error.message);
        res.status(500).send('Server error: MongoDB is not connected.');
    }
}

export const getOriginalUrl=async(req,res)=>{
    try {
        const shortCode=req.params.shortCode
        //find the long url from databsae using short code
        const originalUrl=await Url.findOne({shortCode});

        if(originalUrl){
            res.redirect(originalUrl.longUrl);
        }
        else {
              res.json({
           message :"Invalid shortCode"
        });
        }
    } catch (error) {
        console.error('Error while redirecting URL:', error.message);
        res.status(500).json({ message: 'Server error: MongoDB is not connected.' });
    }

  
}