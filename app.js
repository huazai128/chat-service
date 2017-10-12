const logger       = require("morgan"),
    http           = require("http"),
    express        = require("express"),
    errorhandler   = require("errorhandler"),
    bodyParser     = require('body-parser'),
    helmet         = require("helmet"),
    mongoosePaginate = require("mongoose-paginate"),
    socketioJwt    = require("socketio-jwt");
require("app-module-path").addPath(__dirname + "/"); //模块路径  模块引用路径

const port = process.env.PORT || 3000;
const environment = process.env.NODE_ENV;
const mongoose = require("config/mongodb");
const config = require("config/config");
const routes = require("router/index");
const socketApi = require("router/socketApi");

mongoose.connect();
const app = express();

app.use(logger("dev"));  // 日志
app.use(bodyParser.urlencoded({extended:true}));  // 接受任何类型的参数
app.use(bodyParser.json());
routes(app);
const server = http.createServer(app);
server.on("error",(err) => {
    if(Object.is(err.code,"EADDRINUSE")){
        console.log('server is already started at port ' + port);
    }else{
        throw err;
    }
})

const io = require("socket.io")(server);
// 验证用户
io.set("authorization",socketioJwt.authorize({
    secret:config.jwtTokenSecret,
    handshake:true
}))
io.sockets.on("connection",(socket) => {
    console.log("connected");

    socket.on("ngChat",(req) => {
        socketApi[req.actice](req.data,socket,io);
    })
    // 关闭连接
    socket.on("disconnect",() => {
        console.log("disconnected");
    })
})

server.listen(port,() => {
    console.log("Port : ",port);
})


