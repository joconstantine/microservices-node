import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from '@joconsttickets/common';

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  readonly subject = Subjects.TicketCreated;
}
