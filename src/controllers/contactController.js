import { getAllContacts, getContactById } from '../services/contacts.js';

const getContacts = async (req, res) => {
  try {
    const contacts = await getAllContacts();
    res.status(200).json({
      status: 200,
      message: 'Successfully found contacts!',
      data: contacts,
    });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const getContact = async (req, res) => {
  try {
    const contactId = req.params.contactId;
    const contact = await getContactById(contactId);

    if (!contact) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json({
      status: 200,
      message: `Successfully found contact with id ${contactId}!`,
      data: contact,
    });
  // eslint-disable-next-line no-unused-vars
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

export { getContacts, getContact };
