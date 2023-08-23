const express = require("express");

const router = express.Router();

const joi = require("joi");

const { HttpError } = require("../../helpers");

const contacts = require("../../models/contacts.js");

const validationScheme = joi.object({
  name: joi.string().required(),
  email: joi.string().email().required(),
  phone: joi.number().required(),
});

router.get("/", async (req, res, next) => {
  try {
    const data = await contacts.listContacts();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.get("/:contactId", async (req, res, next) => {
  try {
    const data = await contacts.getContactById(req.params.contactId);
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

router.post("/", async (req, res, next) => {
  try {
    const { error } = validationScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await contacts.addContact(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
});

router.delete("/:contactId", async (req, res, next) => {
  try {
    const data = await contacts.removeContact(req.params.contactId);
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
});

router.put("/:contactId", async (req, res, next) => {
  try {
    const { error } = validationScheme.validate(req.body);
    if (error) {
      throw HttpError(400, error.message);
    }
    const data = await contacts.updateContact(req.params.contactId, req.body);
    if (!data) {
      throw HttpError(404, "Contact not found");
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
});

module.exports = router;
