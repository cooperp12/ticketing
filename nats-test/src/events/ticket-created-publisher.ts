import { Publisher ,TicketCreatedEvent, Subjects } from "@pc508tickets/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    readonly subject = Subjects.TicketCreated;
}