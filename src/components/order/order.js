import React, { useEffect, useState } from 'react';
import OrdersTable from './ordertable';

const App = () => {
    const [orders, setOrders] = useState([]);

    // Fetch orders data from your API or source and update the state

    useEffect(() => {
        // Replace this with your API fetch logic to get the orders data
        fetch(`${process.env.NEXT_PUBLIC_API_BASE_URI}/orders`)
            .then((response) => response.json())
            .then((data) => setOrders(data))
            .catch((error) => console.error('Error fetching orders:', error));
    }, []);

    return (
        <div className="container mx-auto ">
            <h1 className="text-3xl font-semibold mb-4 text-center my-8 py-8">Orders</h1>
            <OrdersTable orders={orders} />
        </div>
    );
};

export default App;