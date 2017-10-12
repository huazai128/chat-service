const Auth = require("models/user");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const config = require("config/config");
const { handleRequest,handleError,handleSuccess } = require("utils/handle");
const authCtrl = {
    list:{},
    item:{},
}
// 加密
const sha256 = (pwd) => {
    return crypto.createHmac("sha256",pwd).update(config.AUTH.defaultPassword).digest("hex")
}
const isOnLine = (res,{userId,message="注册成功"}) => {
    Auth.findOneAndUpdate({_id:userId},{$set:{ online:true}},{new:true})
        .then((auth) => {
            const token = jwt.sign({ // 
                data:config.AUTH.data,
                exp:Math.floor(Date.now() / 1000) + (24 * 60 * 60 * 1000)
            },config.AUTH.jwtTokenSecret);
            handleSuccess({res,message:message,result:{token}})
        })
} 

// GET请求获取用户信息 并且判断email是否注册
authCtrl.list.GET = (req,res) => {
    let querys = {
        email:req.query.email
    }
    if(req.query.online){
        querys .online = req.query.online;
    }
    Auth.find(querys,"-_id name email slogan gravatar")
    .then(([result]) => {
        if(result){
            handleSuccess({res,message:(querys .online ? "获取用户数据成功":"已注册"),result});
        }else{
            handleSuccess({res,message:(querys .online ? "暂无用户信息":"未注册"),result});
        }
    })
    .catch((err) => {
        handleError({res,message:"获取用户信息失败",err})
    })
}

// 登录
authCtrl.list.POST = ({body:{ email,password }},res) => {
    console.log(email,password);
    Auth.find({email:email})
    .then(([user]) => {
        console.log(user)
        if(user){
            if(Object.is(sha256(password),user.password)){
                isOnLine(res,{user:user._id,message:"登陆成功"});
            }else{
                handleError({res,message:"用户或密码错误"})
            }
        }else{
            handleError({res,message:"用户不存在"})
        }
    })
    .catch((err) => {
        handleError({res,message:"登录失败",err})
    })
}
// 注册
authCtrl.item.POST = ({ body:{email,username,passwords}} ,res) => {
    // console.log(email,username,passwords);
    if(Object.is(passwords.password,passwords.repassword)){
        const auth = new Auth({
            email:email,
            name:username,
            password:sha256(passwords.password),
            gravatar:"http://7xsn9b.com1.z0.glb.clouddn.com/" + Math.ceil(7 * Math.random()) + ".jpg"
        })
        auth.save({new:true}).then((user) => {
             isOnLine(res,{user:user._id,message:"注册成功"});
        })
        .catch((err) => {
            handleError({res,message:"注册失败",err})
        });
    }else{
        handleError({res,message:"密码输入不一致",err})
    }
};

// 导出
exports.list = (req,res) => {
    handleRequest({req,res,controller:authCtrl.list})
}
exports.item = (req,res) => {
    handleRequest({req,res,controller:authCtrl.item})
}