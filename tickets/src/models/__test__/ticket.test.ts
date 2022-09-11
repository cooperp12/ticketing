import { Ticket } from '../ticket';

it('implements optimistic concurrency control', async () => {
    // create an instance of a Ticket
    const ticket = Ticket.build({
        title: 'Concert',
        price: 5,
        userId: '123',
    })

    // save the ticket to the database
    await ticket.save();

    // fetch the ticket twice
    const firstInstance = await Ticket.findById(ticket.id);
    const secondInstance = await Ticket.findById(ticket.id);

    // make two seperate changes to the tickets we fetched
    firstInstance!.set({price: 10});
    secondInstance!.set({price: 15});

    // save the first fetched ticket
    await firstInstance!.save();

    // save the second fetched ticket and expect an error
    try{
        expect(async () => {
            await secondInstance!.save();
        });
        return;
    } catch (err) {
        throw new Error('Error caught in try-catch from saving second ticket')
    }

    // This error should never be called as return should be reached
    throw new Error('Should not reach this point!')

});

it('increments the verison number on multiple saves', async () => {
    const ticket = Ticket.build({
        title: 'Concert',
        price: 20,
        userId: '123',
    })

    await ticket.save();
    expect(ticket.version).toEqual(0);

    await ticket.save();
    expect(ticket.version).toEqual(1);

    await ticket.save();
    expect(ticket.version).toEqual(2);
});