import { Publisher, OrderCreatedEvent, Subjects } from '@joconsttickets/common';

export class OrderCreatedPubliser extends Publisher<OrderCreatedEvent> {
  readonly subject = Subjects.OrderCreated;
}
