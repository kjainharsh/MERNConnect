const User = require("../models/user_models");
const Contact = require("../models/contact-models");

const getAllUsers = async (req, res,next) => {
    try {
        const users = await User.find({}, {password: 0 });
        if (!users || users.length == 0) {
            return res.status(404).json({ message: "No Users Found" });
        }
        return res.status(200).json(users);
    } catch (error) {
        next(error); 
    }
}

const deleteUserByID = async (req, res,next) => {
    try {
        const id = req.params.id;
        await User.deleteOne({ _id: id });
        return res.status(200).json({ message: "User Delete Successfully" });
    } catch (error) {
        next(error);        
    }
}
const deleteContactByID = async (req, res,next) => {
    try {
        const id = req.params.id;
        await Contact.deleteOne({ _id: id });
        return res.status(200).json({ message: "Contact Delete Successfully" });
    } catch (error) {
        next(error);        
    }
}

const getUserByID = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = await User.findOne({ _id: id }, { password: 0 });
        return res.status(200).json(data);
    } catch (error) {
        next(error)
    }
}

const updateUserById = async (req, res, next) => {
    try {
        const id = req.params.id;
        const updatedUserData = req.body;
        const updatedData = await User.updateOne({ _id: id }, {
            $set: updatedUserData,
        });
        return res.status(200).json(updatedData);
    } catch (error) {
        next(error);
    }
}

const getAllContacts = async (req, res, next) => {
    try {
        const contacts = await Contact.find({}, { password: 0 });
        if (!contacts || contacts.length == 0) {
            return res.status(404).json({ message: "No Contact Found" });
        }
        return res.status(200).json(contacts);
    } catch (error) {
        next(error);
    }
}

module.exports = { getAllUsers, getAllContacts, deleteUserByID, getUserByID, updateUserById, deleteContactByID };