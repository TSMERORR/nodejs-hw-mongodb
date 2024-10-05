import { ContactsCollection } from '../models/contacts.js';

export const getAllContactsService = async () => {
  try {
    const contacts = await ContactsCollection.find();
    return contacts;
  } catch (error) {
    console.error('Error in getAllContactsService:', error);
    throw error;
  }
};

export const getContactByIdService = async (contactId) => {
  try {
    const contact = await ContactsCollection.findById(contactId);
    return contact;
  } catch (error) {
    console.error('Error in getContactByIdService:', error);
    throw error;
  }
};