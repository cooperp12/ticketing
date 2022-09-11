import request from 'supertest';
import { app } from '../../app';

it('reponds with details of the current user', async () => {
    const cookie = await signin();
   
    const response = await request(app)
        .get('/api/users/currentuser')
        .set('Cookie', cookie)
        .send()
        .expect(200);

    //console.log(response.body);
    expect(response.body.currentUser.email).toEqual('test@test.com'); 
});

it('reponds with null if not authenticated', async () => {
    const response= await request(app)
        .get('/api/users/currentuser')
        .send()
        .expect(200)

    expect(response.body.currentUser).toEqual(null);
});