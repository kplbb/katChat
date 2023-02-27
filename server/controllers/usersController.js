const User = require("../model/userModel");
const bycrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
    try {
        const{password, username, email} = req.body;

        const userNameCheck = await User.findOne({ username });
        if (userNameCheck.username === username)
            return res.json({msg: "Username already exists.", status: false});
            const emailCheck = await User.findOne({email})  
            if (emailCheck) 
                return res.json({msg: "Email already exists.", status: false});
        const hashedPassword = await bycrypt.hash(password, 10); 
        const user = await User.create({
            email, username:username, password: hashedPassword
        });
        delete user.password;
        return res.json({ status: true, user });
    } catch(ex) {
        next(ex)
    }  
};

module.exports.login = async (req, res, next) => {
    try {
        const{password, username} = req.body;
        const user = await User.findOne({ username });
        if (!user) 
            return res.json({msg: "Incorrect username or password.", status: false});
        const isPasswordValid = await bycrypt.compare(password, user.password);
        if (!isPasswordValid) 
            return res.json({msg: "Incorrect username or password.", status: false});
        delete user.password;
        return res.json({status: true, user});
    } catch(ex) {
        next(ex)
    }  
};

module.exports.setAvatar = async (req, res, next) => {
    try {
        const userId = req.params.id;
        const avatarImg = req.body.image;
        const userData = await User.findByIdAndUpdate(userId, {
            isAvatarImageSet : true,
            avatarImage : avatarImg
        });
        return res.json({
            isSet: true,
            image: avatarImg
        });
    } catch(ex) {
        next(ex)
    }  
};

module.exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find({ _id: { $ne: req.params.id } }).select([
            "email",
            "username",
            "avatarImage",
            "_id",
        ]);
        return res.json(users);
    } catch (ex) {
    next(ex);
    }
};