const mongoose = require("config/mongodb").mongoose;
const crypto   = require("crypto");
const config   = require("config/config");
const ObjectId = mongoose.Schema.Types.ObjectId;

const UserSchema = new mongoose.Schema({
    name:{type:String,default:""},
    email:{ type:String,default:"" },
    slogan:{ type:String,default:"" },
    gravatar:{type:String,default:"" },
    password:{type:String,require:true},
    online:{type:Boolean,default: false},
    roomId:{type:ObjectId,ref:"Room"},
    meta:{
        createTime:{type:Date,default:Date.now},
        updateTime:{type:Date,default:Date.now}
    }
})

// 保存前进入这个方法
const Auth = mongoose.model("Auth",UserSchema);

module.exports = Auth;