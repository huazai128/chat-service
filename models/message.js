const mongoose = require("config/mongodb").mongoose;
const ObjectId = mongoose.Schema.Types.ObjectId;

const MessageSchema = new mongoose.Schema({
    content:{type:String,required:true},
    user:{ type:ObjectId,ref:"Auth" },
    create_at:{ type:Date,default:Date.now }
})

const Message = mongoose.model("Message",MessageSchema);
module.exports = Message;