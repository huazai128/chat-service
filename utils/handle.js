// 请求
exports.handleRequest = ({req,res,controller}) => {
    const method = req.method; // 获取请求的方法；
    const support = !!controller[method]; 
    support && controller[method](req,res); // 支持这种方法就是调用controller
    support || res.status(405).jsonp({code: 0,message:"不支持该请求类型！"});
}

// 请求失败
exports.handleError = ({ res,message="请求失败",err = null }) => {
    res.jsonp({ code: 0, message, debug: err });
}

// 请求成功
exports.handleSuccess = ({res,message = "请求成功",result = null}) => {
    res.jsonp({
        code: 1,
        message,
        result,
    })
}
