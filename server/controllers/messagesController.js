const User = require("../model/userModel");
const bycrypt = require("bcrypt");
const messageModel = require("../model/messageModel");
const Messages = require("../model/messageModel");

module.exports.addMessage = async (req, res, next) => {
    try {
        const{to, from, message, sender} = req.body;
        const data = await messageModel.create({
            message : {text: message},
            users: [to, from],
            sender: sender,
        });
        if(data) return res.json({msg:"Message sent."});
        return res.json({msg:"Failed to send message"});
    } catch(ex) {
        next(ex)
    }  
};

module.exports.getAllMessages = async (req, res, next) => {
    try {
        const { from, to } = req.body;
        const messages = await Messages.find({
            users: { $all: [ to, from ] }
        }).sort({ updatedAt: 1 });
        const projectedMessages = messages.map((msg) => {
            return {
                fromSelf: msg.sender.toString() === from,
                message: msg.message.text,
            };
        });
        res.json(projectedMessages);
    } catch (ex) {
        next(ex);
    }
};
