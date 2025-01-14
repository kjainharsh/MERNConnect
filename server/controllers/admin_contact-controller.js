const Contact = require("../models/contact-models");

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

module.exports = getAllContacts;