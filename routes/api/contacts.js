const express = require("express");

const router = express.Router();

const Contacts = require("../../controllers/contacts");

router.get("/", Contacts.getAll);

router.get("/:contactId", Contacts.getById);

router.post("/", Contacts.addNewContact);

router.delete("/:contactId", Contacts.removeContact);

router.put("/:contactId", Contacts.updateContact);

router.patch("/:contactId/favorite", Contacts.updateStatusContact);

module.exports = router;
