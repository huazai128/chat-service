const Room = require("models/room");
const { handleRequest,handleError,handleSuccess } = require("utils/handle");
const roomCtrl = {
    list:{},
    item:{},
}

// 获取所有的rooms
roomCtrl.list.GET = (req,res) => {
    console.log("dasdsada");
}

exports.list = (req,res) => {handleRequest({req,res,controller:roomCtrl.list})}