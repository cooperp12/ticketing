import { Subjects, Publisher, PaymentCreatedEvent } from '@pc508tickets/common';

export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent> {
    readonly subject = Subjects.PaymentCreated;
}