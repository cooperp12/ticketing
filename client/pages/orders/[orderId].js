import { useEffect, useState } from 'react';
import StripeCheckOut from 'react-stripe-checkout';
import Router from 'next/router';
import useRequest from '../../hooks/use-request';

const OrderShow = ({ order, currentUser }) => {
    const [timeLeft, setTimeLeft] = useState(0);
    const {doRequest, errors} =  useRequest({
        url: '/api/payments',
        method: 'post',
        body: {
            orderId: order.id
        },
        onSuccess: () => Router.push('/orders'),
    });

    useEffect(() => {
        const findTimeLeft = () => {
            const msLeft = new Date(order.expiresAt) - new Date();
            setTimeLeft(Math.round(msLeft / 1000));
        };

        findTimeLeft();
        const timeId = setInterval(findTimeLeft, 1000);

        return () => {
            clearInterval(timeId);
        };
    }, [order]);
    
    if (timeLeft < 0){
        return <div>Order Expired</div>
    }

    return (<div>
        Time left to pay: {timeLeft} seconds
        <StripeCheckOut 
            token={({ id }) => doRequest({token: id})}
            stripeKey="pk_test_51LgMBHGub4R4ekRsqtpHWycggMKeGrPefHUJZ5g3ZQ0UEm11lHV893inCWGE09rIPTRtAwzQVU5RWUeUAzn2jtAB00A4m7lVL4"
            amount={order.ticket.price * 100}
            email={currentUser.email}
        />
        {errors}
    </div>
    );
};

OrderShow.getInitialProps = async (context, client) => {
    const { orderId } = context.query;
    const { data } = await client.get(`/api/orders/${orderId}`);

    return { order : data };
};

export default OrderShow;