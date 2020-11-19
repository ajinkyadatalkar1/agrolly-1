//jshint esversion:6

import express, { static } from 'express';
import { urlencoded } from 'body-parser';
import request from 'request';
import { request as _request } from 'https';
import { response } from 'express';



const app = express();

app.use(static("public"));
app.use(urlencoded({extended:true}))
app.set('view engine', 'ejs');

app.get('/',function(req,res){
    // res.render("index")
    res.sendFile(__dirname+ "/index.html")
})

app.get('/about',function(req,res){
    res.sendFile(__dirname+ "/about.html")
})

app.get('/media',function(req,res){
    res.sendFile(__dirname+ "/media.html")
})

app.get('/tech',function(req,res){
    res.sendFile(__dirname+ "/technology.html")
})

app.get('/research',function(req,res){
    res.sendFile(__dirname+ "/research.html")
})

app.post('/',function(req, res){

    const name = req.body.yourname;
    const email = req.body.youremail;

    console.log(name, email)

    const data = {
        members:[
            {
                email_address:email,
                status: "subscribed",
                merge_fields:{
                    FNAME:name
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data);

    const url = "https://us10.api.mailchimp.com/3.0/lists/fa5929e66c"

    const option = {
        method: "POST",
        auth:"helentsai:816457cd722a71e1eef2aa62a5267d2b-us10"
    }

    const request = _request(url,option,function(response){
        if(response.statusCode ===200){
            res.sendFile(__dirname+ "/success.html")
        }else{
            res.sendFile(__dirname+ "/failure.html")
        }


        response.on("data",function(data){
            console.log(JSON.parse(data))
        })
    })
    request.write(jsonData);
    request.end();

})


app.post("/failure", function(req,res){
    res.redirect("/")
})

app.post("/success", function(req,res){
    res.redirect("/")
})

app.listen(8080 ,function(){
    console.log("server is running on port 8080");
    
})