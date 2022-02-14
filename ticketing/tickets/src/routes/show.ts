import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { Ticket } from '../models/ticket';
import { NotFoundError } from '@joconsttickets/common';

const router = express.Router();

router.get('/api/tickets/:id', async (req: Request, res: Response) => {
  const ticket = await Ticket.findById(req.params.id);

  if (!ticket) {
    throw new NotFoundError();
  }

  res.send(ticket); //200
});

export { router as showTicketRouter };
