const mongoose = require("mongoose");

const chatSchema = mongoose.Schema({
    from:{
        type:String,
        require:true
    },
    to:{
        type:String,
        require:true
    },
    msg:{
        type:String
        
    },
    create_at:{
        type:Date
    }
})

const Chat = mongoose.model("Chat",chatSchema);

module.exports=Chat;