import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from '@joconsttickets/common';

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  readonly subject = Subjects.TicketUpdated;
}
