const express=require("express");
const app=express();
require('dotenv').config()
const request=require("request");
const bodyParser=require("body-parser");
const http=require("https");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
    const fn=req.body.firstname;
    const ln=req.body.lastname;
    const email=req.body.email;
   const data={
       members:[
           {
           email_address:email,
           status:"subscribed",
           merge_fields:{
               FNAME:fn,
               LNAME:ln,
           }
        }
        ]
   }
   const jsonData=JSON.stringify(data);
   const url="https://us14.api.mailchimp.com/3.0/lists/1b7a1b4427";
   const options={
       method:"POST",
       auth: process.env.API_KEY,
   }

   const rqst=http.request(url,options,function(response){
            if(response.statusCode===200){
                res.sendFile(__dirname+"/success.html");
            }
            else
            res.sendFile(__dirname+"/failure.html");
        response.on("data",function(data){
           console.log(JSON.parse(data));
       });
   });
   rqst.write(jsonData);
   rqst.end();
});
app.post("/failure",function(request,response){
    response.redirect("/");
})
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running on 3000");
});
//api key
// 

// audience key
// 