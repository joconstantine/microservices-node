import { Message } from 'node-nats-streaming';
import { Subjects, Listener, TicketCreatedEvent } from '@joconsttickets/common';

import { Ticket } from '../../models/ticket';
import { QueueGroupName } from './queue-group-name';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: TicketCreatedEvent['data'], msg: Message) {
    const { id, title, price } = data;

    const ticket = Ticket.build({ id, title, price });
    await ticket.save();

    msg.ack();
  }
}
