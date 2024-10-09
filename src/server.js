const env = require('./utils/env');
const express = require('express');
const cors = require('cors');
const pinoHttp = require('pino-http'); 
const pino = require('pino'); 
const { getAllContacts, getContactById } = require('./services/contacts');
require('dotenv').config();

const setupServer = () => {
  const app = express();
  const logger = pino({
    transport: {
      target: 'pino-pretty', 
    },
  });

  const PORT = Number(env('PORT', 3000));

 
  app.use(pinoHttp({
    logger, 
  }));

  app.use(cors());
  app.use(express.json());

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      req.log.error('Error fetching contacts:', error); 
      res.status(500).json({ message: 'Error fetching contacts' });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
      if (!contact) {
        return res.status(404).json({ message: 'Contact not found' });
      }
      res.status(200).json({
        status: 200,
        message: `Successfully found contact with id ${contactId}!`,
        data: contact,
      });
    } catch (error) {
      req.log.error('Error fetching contact:', error);
      res.status(500).json({ message: 'Error fetching contact' });
    }
  });


  app.use((req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.listen(PORT, () => {
    logger.info(`Server is running on port ${PORT}`);
  });
};

module.exports = setupServer;
