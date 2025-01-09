const User = require("../models/user_models");
const bcrypt = require("bcryptjs");

const home = async (req, res) => {
    try {
        res.status(200).send("Welcome hello");
    } catch (error) {
        console.log(error);
    }
};

const register = async (req, res) => {
    try {
        console.log(req.body);
        const { username, email, phone, password } = req.body;

        const UserExist = await User.findOne({ email: email });
        if (UserExist) {
            return res.status(400).json({ message: "Email already exists" });
        }

        //hash password
        // const saltRound = 10;
        // const hash_password = await bcrypt.hash(password, saltRound);

        // const data = await User.create({ username, email, phone, password: hash_password });
        const data = await User.create({ username, email, phone, password });
        res.status(200).json({ msg:"Registration Successfully Done ",token : await data.generateToken(),userId:data._id.toString() });
    } catch (error) {
        //res.status(500).json({ message: "Server error" });
        next(error);
    }
};


const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userExist = await User.findOne({ email });
        if (!userExist) {
            return res.status(400).json({ message: "Invalid Credentials" });
        }
        //const user = await bcrypt.compare(password, userExist.password);
        const user = await userExist.comparePassword(password);
        if (user) {
            res.status(200).json({ msg: "Login Successfully Done ", token: await userExist.generateToken(), userId: userExist._id.toString() });
        }
        else {
            res.status(401).json({ message: "Invalid Login Credentials" });
        }
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};

const user = async (req, res) => {
    try {
        const userData = req.user;
        console.log(userData);
        
        return res.status(200).json({ userData });
        
    } catch (error) {
        console.log(`error from the user route ${error}`);
    }
}
module.exports = { home, register,login,user };
