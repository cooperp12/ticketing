import { Publisher ,TicketUpdatedEvent, Subjects } from "@pc508tickets/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    readonly subject = Subjects.TicketUpdated;
}