const express = require("express");
const app = express();
const port = 8080;
const path = require("path");
const mongoose = require('mongoose');
const Chat = require("./models/chat.js")
const methodOverride=require("method-override")

app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));
app.use(express.urlencoded({extended:true}))
app.use(methodOverride("_method"));

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

app.get("/",(req,res)=>{
    res.send("Welcome to home page");
})

//index route

app.get("/chats", async (req,res) => {
    let chats= await Chat.find();
    res.render("index.ejs",{chats})
})

//new chats

app.get("/chats/new", async (req,res) => {
    res.render("new.ejs")
})

//create chats

app.post("/chats",(req,res)=>{
    let {from,to,msg}=req.body;
    let newChat= new Chat ({
        from:from,
        to:to,
        msg:msg
    })
    newChat.save()
        .then((res)=>{console.log(res)})
        .catch((err)=>{console.log(err)})

    res.redirect("/chats")
})

//edit route

app.get("/chats/:id/edit", async(req,res)=>{
    let {id}=req.params;
    let chat= await Chat.findById(id);
    res.render("edit.ejs",{chat})
})

//update route

app.put("/chats/:id", async(req,res)=>{
    let {id}=req.params;
    let {msg:newMsg}=req.body;
    let updatedChat= await Chat.findByIdAndUpdate(id,{msg:newMsg},{runValidater:true,new:true})
    console.log(updatedChat);
    res.redirect("/chats")
})

//delete route

app.delete("/chats/:id",async (req,res)=> {
    let {id}=req.params;
    await Chat.findByIdAndDelete(id);
    res.redirect("/chats")
})


app.listen(port,(req,res)=>{
    console.log(`server is listening to port: ${port}`)
})