import {
  getAllContactsService,
  getContactByIdService,
} from '../services/contacts.js';

export const getAllContacts = async (req, res) => {
  try {
    const contacts = await getAllContactsService();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  } catch (error) {
    console.error('Error in getAllContacts:', error);
    res.status(500).json({
      message: 'Failed to fetch contacts',
      error: error.message,
    });
  }
};

export const getContactById = async (req, res) => {
  const { contactId } = req.params;
  try {
    const contact = await getContactByIdService(contactId);
    if (!contact) {
      res.status(404).json({
        message: 'Contact not found',
      });
      return;
    }
    res.status(200).json({
      status: 200,
      message: 'Successfully found contact!',
      data: contact,
    });
  } catch (error) {
    console.error('Error in getContactById:', error);
    res.status(500).json({
      message: 'Failed to fetch contact',
      error: error.message,
    });
  }
};