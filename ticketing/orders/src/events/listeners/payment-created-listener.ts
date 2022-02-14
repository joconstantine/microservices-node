import {
  Listener,
  PaymentCreatedEvent,
  Subjects,
  OrderStatus,
} from '@joconsttickets/common';
import { Message } from 'node-nats-streaming';

import { QueueGroupName } from './queue-group-name';
import { Order } from '../../models/order';

export class PaymentCreatedListener extends Listener<PaymentCreatedEvent> {
  readonly subject = Subjects.PaymentCreated;
  queueGroupName = QueueGroupName;

  async onMessage(data: PaymentCreatedEvent['data'], msg: Message) {
    const order = await Order.findById(data.orderId);

    if (!order) {
      throw new Error('Order not found');
    }

    order.set({ status: OrderStatus.Complete });
    await order.save();

    msg.ack();
  }
}
