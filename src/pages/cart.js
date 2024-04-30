// // import { getNodeText } from '@testing-library/react';
// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { remove } from '../store/cartSlice';

// const Cart = () => {
//     const dispatch = useDispatch();
//     const products = useSelector((state) => state.cart);
//     console.log(products)
//     const handleRemove = (productId) => {
//         dispatch(remove(productId));
//     };

//     return (
//         <div>
//             <h3>Cart</h3>
//             <div className="flex flex-col md:flex-row justify-between gap-4">
//                 {products.map((product) => (
//                     <div key={product.id} className="bg-white w-full p-4 md:w-1/3">
//                         <img src={product.image} alt="" className='h-48' />
//                         <h5>{product.title}</h5>
//                         <h5>{product.price}</h5>
//                         <div className='flex -flex-row justify-between'>
//                             <h5>{product.color}</h5>
//                             <h5>{product.tone}</h5>
//                             <img src={product.shade} alt={product.title} className='h-10' />
//                         </div>
//                         <button
//                             className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
//                             onClick={() => handleRemove(product.id)}
//                         >
//                             Remove
//                         </button>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };

// export default Cart;

import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { remove } from '../store/cartSlice';
import Navbar from '@/components/customerProduct/navbar';
import Link from 'next/link';

const Cart = () => {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.cart);
    console.log(products);
    useEffect(() => {
        localStorage.setItem("products", JSON.stringify(products))
    }, [])

    const handleRemove = (productId) => {
        // console.log(productId)
        dispatch(remove(productId));
    };

    return (
        <div>
            <Navbar />
            <h3 className='my-8 text-5xl text-center'>Cart</h3>
            <table className="w-3/4 mx-auto  ">
                <thead>
                    <tr className="bg-gray-200">
                        <th className="border border-gray-400 p-2">Image</th>
                        <th className="border border-gray-400 p-2">Title</th>
                        <th className="border border-gray-400 p-2">Price</th>
                        <th className="border border-gray-400 p-2">Color</th>
                        <th className="border border-gray-400 p-2">Tone</th>
                        <th className="border border-gray-400 p-2">Shade</th>
                        <th className="border border-gray-400 p-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products.map((product, i) => (
                        <tr key={i}>
                            <td className="border border-gray-400 p-2">
                                <img src={product.image} alt="" className="h-10 w-full" />
                            </td>
                            <td className="border border-gray-400 p-2">{product.title}</td>
                            <td className="border border-gray-400 p-2">{product.price}</td>
                            <td className="border border-gray-400 p-2">{product.color}</td>
                            <td className="border border-gray-400 p-2">{product.tone}</td>
                            <td className="border border-gray-400 p-2">
                                <img src={product.shade} alt={product.title} className="h-10" />
                            </td>
                            <td className="border border-gray-400 p-2">
                                <button
                                    className="text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700"
                                    onClick={() => handleRemove(product.id)}
                                >
                                    Remove
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className='w-3/4 mx-auto my-8'>
                <Link href="/form" className='text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700'>Proceed to Checkout</Link>
            </div>
        </div>
    );
};

export default Cart;
