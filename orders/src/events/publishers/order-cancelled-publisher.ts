import {Publisher, OrderCancelledEvent, Subjects } from '@pc508tickets/common';

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    readonly subject = Subjects.OrderCancelled;
}
