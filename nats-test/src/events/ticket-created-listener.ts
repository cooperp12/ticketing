import { Message } from 'node-nats-streaming';
import { Listener } from '@pc508tickets/common'; 
import { TicketCreatedEvent } from '@pc508tickets/common';
import { Subjects } from '@pc508tickets/common';

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
    readonly subject = Subjects.TicketCreated;
    queueGroupName = 'payments-service';

    onMessage(data: TicketCreatedEvent['data'], msg: Message){
        console.log('Event data!', data);

        console.log(data.id);
        console.log(data.title);
        console.log(data.price);

        msg.ack();
    }
}