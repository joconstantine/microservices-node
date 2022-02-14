import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from '@joconsttickets/common';

export class OrderCancelledPubliser extends Publisher<OrderCancelledEvent> {
  readonly subject = Subjects.OrderCancelled;
}
