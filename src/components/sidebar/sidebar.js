import React, { useState } from 'react';
import Link from 'next/link';
import { FaBars, FaTimes } from 'react-icons/fa'; // Import icons for open and close actions

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleSidebar = () => {
        setIsOpen(!isOpen);
    };

    const logout = () => {
        localStorage.setItem('accessToken', '');
    };

    return (
        <div className="">
            {isOpen ? (
                <div
                    className="bg-gray-800 text-white fixed top-0 left-0 h-screen w-screen "
                >
                    <div className="text-right p-4">
                        <button onClick={toggleSidebar}>
                            <FaTimes /> {/* Close button icon */}
                        </button>
                    </div>
                    <div className="text-center">
                        <Link href="/product" className="block m-4">
                            Product
                        </Link>
                        <Link href="/order" className="block m-4">
                            Orders
                        </Link>
                        <Link href="/addProduct" className="block m-4">
                            Home
                        </Link>
                        <Link href="/customProduct" className="block m-4" onClick={logout}>
                            Log Out
                        </Link>
                    </div>
                </div>
            ) : (
                <button
                    className="text-white p-2 m-2 absolute top-2 right-2"
                    onClick={toggleSidebar}
                >
                    <FaBars />
                </button>
            )}
        </div>
    );
};

export default Sidebar;
