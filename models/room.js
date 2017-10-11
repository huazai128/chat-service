const mongoose = require("config/mongodb").mongoose;
const OjectId = mongoose.Schema.Types.ObjectId;

const RoomSchema = new mongoose.Schema({
    name:{ type:String,default:"" },
    user:[{ type:OjectId,ref:"Auth" }],
    create_at:{ type:Date,default: Date.now }
})

const Room = mongoose.model("Room",RoomSchema);
module.exports = Room;