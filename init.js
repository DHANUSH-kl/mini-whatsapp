const mongoose = require('mongoose');
const Chat = require("./models/chat.js")


main()
    .then(console.log("Connection successful"))
    .catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
}

const allChats=[
    {
        from:"user1",
        to:"user2",
        msg:"heyy there",
        created_at:new Date()
    },
    {
        from:"user1 ",
        to:"user2",
        msg:"hello",
        created_at:new Date()
    },
    {
        from:"user1",
        to:"user2",
        msg:"good morning",
        created_at:new Date()
    },
]

Chat.insertMany(allChats);