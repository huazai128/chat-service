const config =  require("config/config"),
      jwt = require("jsonwebtoken");
const authToken = (req) => {
    if(req.headers && req.headers.authorization){
        console.log(req.headers.authorization);
        const parts = req.headers.authorization.split(" ");
        if (Object.is(parts.length, 2) && Object.is(parts[0], 'Bearer')) {
            return parts[1];
        }
    }
    return false;
} 
// 权限验证
const authIsVerified = (req) => {
    const token = authToken(req); // 判断是否登录
    if(token){
        try{
            // token解密
            const decodedToken = jwt.verify(token,config.AUTH.jwtTokenSecret)
            if(decodedToken.exp > Math.floor(Date.new() / 1000)){
                return true;
            }
        }catch (err){}
    }
    return false;
}

module.exports = authIsVerified;