"use client"
import React, { useState, useEffect } from 'react';
import TableComponent from './Products';
import Sidebar from '../sidebar/sidebar';
import ProductDetail from './productDetailpage';
import axios from 'axios';
import { useRouter } from 'next/router';

const ParentComponent = () => {
    const router = useRouter()
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [data, setData] = useState([])

    useEffect(() => {

        const token = localStorage.getItem("accessToken")
        if (!token) {
            router.push("/admin")
        }

        const products = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URI}/products`)
            console.log("response", response.data)
            setData(response.data)
        }
        products()
    }, [])

    const handleRowClick = (productId) => {
        // Find the selected product by its ID
        const product = data.find((item) => item._id === productId);
        console.log(product)
        setSelectedProduct(product);
    };
    const handleBackToTable = () => {
        setSelectedProduct(null); // Clear the selected product
    };
    const deleteproduct = async () => {

        const response = await axios.delete(`${process.env.NEXT_PUBLIC_API_BASE_URI}/products/${selectedProduct._id}`)
        console.log(response)
        if (response.data.message == "Product deleted successfully") {
            router.push("/product")
        }

    }

    return (
        <div className="container mx-auto p-4">
            <Sidebar />
            <h1 className="text-2xl font-semibold mb-4 text-center">Product List</h1>
            {selectedProduct ? (
                <ProductDetail product={selectedProduct} onBackClick={handleBackToTable} onDelete={deleteproduct} />
            ) : (
                <TableComponent data={data} onRowClick={handleRowClick} />
            )}
        </div>
    );
};

export default ParentComponent;