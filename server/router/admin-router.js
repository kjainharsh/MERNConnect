const express = require("express");
const getAllUsers = require("../controllers/admin-controller");
const getAllContacts = require("../controllers/admin_contact-controller");
const router = express.Router();

router.route('/users').get(getAllUsers);
router.route('/contacts').get(getAllContacts);

module.exports = router;