const Contact = require("../models/contact");

const { HttpError } = require("../helpers/httpError");

const {
  addContactValidationSchema,
  addFavoriteValidationSchema,
} = require("../utils/validation/contactValidationSchemas");

async function getAllContacts(req, res, next) {
  try {
    const data = await Contact.find();
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function getContactsById(req, res, next) {
  try {
    const data = await Contact.findOne({ _id: req.params.contactId });
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function addNewContact(req, res, next) {
  try {
    const { error } = addContactValidationSchema.validate(req.body);
    if (error) {
      const err = new HttpError(400, error.message);
      throw err;
    }
    const data = await Contact.create(req.body);
    res.status(201).json(data);
  } catch (error) {
    next(error);
  }
}

async function removeContact(req, res, next) {
  try {
    const data = await Contact.findByIdAndRemove(req.params.contactId);
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.json({ message: "contact deleted" });
  } catch (error) {
    next(error);
  }
}

async function updateContact(req, res, next) {
  try {
    const { error } = addContactValidationSchema.validate(req.body);
    if (error) {
      const err = new HttpError(400, error.message);
      throw err;
    }
    const data = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

async function updateStatusContact(req, res, next) {
  try {
    const { error } = addFavoriteValidationSchema.validate(req.body);
    if (error) {
      const err = new HttpError(400, error.message);
      throw err;
    }
    const data = await Contact.findByIdAndUpdate(
      req.params.contactId,
      req.body,
      { new: true }
    );
    if (!data) {
      const error = new HttpError(404, "Contact not found");
      throw error;
    }
    res.status(200).json(data);
  } catch (error) {
    next(error);
  }
}

module.exports = {
  getAllContacts,
  getContactsById,
  addNewContact,
  removeContact,
  updateContact,
  updateStatusContact,
};
