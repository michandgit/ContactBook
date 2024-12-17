const express = require("express");
const router = express.Router();
const { getContact , createContact , editContact , deleteContact , getContacts } =  require("../Controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");



router.use(validateToken);

router.route("/").get(getContacts);
router.route("/:id").get(getContact);

router.route("/").post(createContact);

router.route("/:id").put(editContact);

router.route("/:id").delete(deleteContact);


module.exports = router; 