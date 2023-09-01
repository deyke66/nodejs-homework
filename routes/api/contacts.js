const express = require("express");

const router = express.Router();

const {
  getAllContacts,
  getContactsById,
  addNewContact,
  removeContact,
  updateContact,
  updateStatusContact,
} = require("../../controllers/contacts");

router.get("/", getAllContacts);

router.get("/:contactId", getContactsById);

router.post("/", addNewContact);

router.delete("/:contactId", removeContact);

router.put("/:contactId", updateContact);

router.patch("/:contactId/favorite", updateStatusContact);

module.exports = router;
