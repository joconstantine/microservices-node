import {
  Publisher,
  Subjects,
  PaymentCreatedEvent,
} from '@joconsttickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
}
