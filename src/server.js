import express from 'express';
import pino from 'pino-http';
import cors from 'cors';
import { env } from './utils/env.js';
import {
  getAllContacts,
  getContactById,
} from './controllers/contactController.js';

const PORT = Number(env('PORT', '4040'));

export const setupServer = () => {
  const app = express();

  app.use(express.json());
  app.use(cors());
  app.use(
    pino({
      transport: {
        target: 'pino-pretty',
        options: {
          translateTime: true,
        },
      },
    }),
  );

  app.get('/contacts', async (req, res) => {
    try {
      const contacts = await getAllContacts();
      res.status(200).json({
        status: 200,
        message: 'Successfully found contacts!',
        data: contacts,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({
        message: 'Failed to fetch contacts',
        error: error.message,
      });
    }
  });

  app.get('/contacts/:contactId', async (req, res) => {
    const { contactId } = req.params;
    try {
      const contact = await getContactById(contactId);
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
      console.error(error);
      res.status(500).json({
        message: 'Failed to fetch contact',
        error: error.message,
      });
    }
  });

  app.use('*', (req, res, next) => {
    res.status(404).json({
      message: 'Not found',
    });
  });

  app.use((err, req, res, next) => {
    res.status(500).json({
      message: 'Something went wrong',
      error: err.message,
    });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};