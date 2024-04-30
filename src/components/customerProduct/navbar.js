"use client"
import React from 'react';
import Link from 'next/link';
import { useSelector } from 'react-redux';

const Navbar = () => {
    const items = useSelector((state) => state.cart);
    return (
        <div
            className='flex flex-row justify-between my-8 px-8 text-2xl font-bold'
        >
            <span className="logo">Colors STORE</span>
            <div className='flex flex-row gap-8 '>
                <Link href="/customProduct" className='text-2xl font-bold'>
                    Home
                </Link>
                <Link href="/cart" className='text-2xl font-bold'>
                    Cart
                </Link>
                <span className="text-2xl font-bold">Cart items: {items.length}</span>
                <Link href="/admin" className='text-white font-bold py-2 px-4 rounded bg-blue-500 hover:bg-blue-700'>
                    Admin
                </Link>
            </div>
        </div>
    );
};

export default Navbar;