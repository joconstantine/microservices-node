import {
  Subjects,
  Publisher,
  ExpirationCompleteEvent,
} from '@joconsttickets/common';

export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent> {
  readonly subject = Subjects.ExpirationComplete;
}
