const mongoose = require("mongoose");
mongoose.Promise = require("bluebird");

exports.mongoose = mongoose;

exports.connect = () => {
    mongoose.connect("mongodb://localhost/ng4-h");
     
    //连接出错
    mongoose.connection.on("error",(err) => {
        console.log("数据库连接失败!",err)
    })

    //连接成功,once()只连接一次
    mongoose.connection.once("open",() => {
        console.log("数据库连接成功!")
    })

    return mongoose;
}