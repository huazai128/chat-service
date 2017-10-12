const config = require("config/config");
const authIsVerified = require("utils/auth");
const controls = require("controllers/index");

const routes = (app) => {
    app.all("*",(req,res,next) => {
        // 跨域解决
        res.header("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Origin","*");
        res.header('Access-Control-Allow-Headers', 'Authorization, Origin, No-Cache, X-Requested-With, If-Modified-Since, Pragma, Last-Modified, Cache-Control, Expires, Content-Type, X-E4M-With');
        res.header('Access-Control-Allow-Methods', 'PUT,PATCH,POST,GET,DELETE,OPTIONS'); // 请求方法
        res.header('Access-Control-Max-Age', '1728000');
        res.header('Content-Type', 'application/json;charset=utf-8');
        res.header('X-Powered-By', 'NodeH+ V1.0.0');
        if(req.method == "OPTIONS"){
            res.sendStatus(200);
            return false;
        }

        // 允许以下两种POST请求通过
        const isPostAuth = Object.is(req.url,"/auth") && Object.is(req.method,"POST");
        const isPostSign = Object.is(req.url,"/sign") && Object.is(req.method,"POST");
        if(isPostAuth || isPostSign){
            next();
            return false;
        }

        // 验证token和请求方法
        if(!authIsVerified(req) && !Object.is(req.method,"GET")){
            res.status(401).jsonp({code: 0,message:"长的太丑了，不见！！！"})
            return false;
        }
        next();
    });

    app.get("/",(req,res) => {
        res.jsonp({
            code:1,
            message:"欢迎您访问后台"
        })
    })
    // Auth;
    app.all("/auth",controls.auth.list);
    app.all("/sign",controls.auth.item);

    // Room
    // app.all("/rooms",controls.room.list);

    
    app.all("*",(req,res) => {
        res.status(404).jsonp({
            code: 0,
            message:"无效的请求"
        })
    })
}

module.exports = routes;