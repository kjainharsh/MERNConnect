const Contact = require("../models/contact-models");

const contactForm = async (req, res) => {
    try {
        const response = req.body;
        await Contact.create(response);
        return res.status(200).send({ message: "Message sent successfully" });
    } catch (error) {
        console.log(error);
        return res.status(500).send({ message: "Message not delivered" });
    }
};

module.exports = contactForm;
