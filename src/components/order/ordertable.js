import React from 'react';

const OrdersTable = ({ orders }) => {
    return (
        <div className="overflow-x-auto w-3/4 mx-auto">
            <table className="min-w-full table-auto">
                <thead>
                    <tr>
                        <th className="border">Order ID</th>
                        <th className="border">Name</th>
                        <th className="border">Email</th>
                        <th className="border">Phone Number</th>
                        <th className="border">Address</th>
                        <th className="border">Products</th>
                    </tr>
                </thead>
                <tbody>
                    {orders.map((order) => (
                        <tr key={order._id} className='bg-white'>
                            <td className="border">{order._id}</td>
                            <td className="border">{order.name}</td>
                            <td className="border">{order.email}</td>
                            <td className="border">{order.phoneNumber}</td>
                            <td className="border">{order.address}</td>
                            <td className="border">
                                <ul>
                                    {order.order.map((product) => (
                                        <li key={product._id}>
                                            {product.title} - Price: ${product.price}
                                        </li>
                                    ))}
                                </ul>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default OrdersTable;
