
"use client"
import React, { useEffect, useState } from 'react';
import Sidebar from '../sidebar/sidebar';
import axios from 'axios';
import { useRouter } from 'next/router';
import Spinner from '@/components/spinner/spinner';

const ColorManagementSystem = () => {

    const router = useRouter()
    const [productImage, setProductImage] = useState(null);
    const [colorRows, setColorRows] = useState([]);
    const [inputFieldCount, setInputFieldCount] = useState('');
    const [currentRow, setCurrentRow] = useState(0);
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const token = localStorage.getItem("accessToken")
        if (!token) {
            router.push("/admin")
        }
    }, [])


    const handleProductImageUpload = async (e) => {
        const selectedImage = e.target.files[0];

        try {
            const formData = new FormData();
            formData.append('image', selectedImage);

            const imageResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URI}/upload-image`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            setProductImage(imageResponse.data.imageUrl);
        } catch (error) {
            console.error(error);
            alert('Product image upload failed');
        }
    };
    const handleCountChange = (e) => {
        const count = Number(e.target.value);
        setInputFieldCount(count);
        const initialRow = Array(count).fill('');
        setColorRows([initialRow]);
        setCurrentRow(0);
    };

    const addRow = () => {
        const newRow = Array(inputFieldCount + 1).fill(''); // Add +1 for the tone input
        setColorRows([...colorRows, newRow]);
        setCurrentRow(currentRow + 1);
    };

    const removeRow = (rowIndex) => {
        const updatedRows = colorRows.filter((_, index) => index !== rowIndex);
        setColorRows(updatedRows);
        setCurrentRow(currentRow - 1);
    };

    const handleInputChange = (e, rowIndex, fieldIndex) => {
        const updatedRows = [...colorRows];
        updatedRows[rowIndex][fieldIndex] = e.target.value;
        setColorRows(updatedRows);
    };


    const handleImageUpload = (e, rowIndex, fieldIndex) => {
        const selectedImage = e.target.files[0];
        const updatedRows = [...colorRows];
        updatedRows[rowIndex][fieldIndex] = selectedImage;
        setColorRows(updatedRows);
    };


    const check = async () => {
        setLoading(true)
        const formattedArray = [];

        for (let colorIndex = 0; colorIndex < colorRows[0].length; colorIndex++) {
            const colorName = colorRows[0][colorIndex];
            const colorObject = { color: colorName, tones: [] };

            for (let rowIndex = 1; rowIndex < colorRows.length; rowIndex++) {
                const tone = colorRows[rowIndex][0];
                const shade = colorRows[rowIndex][colorIndex + 1];

                // Append the image file to FormData
                const formData = new FormData();
                formData.append('image', shade);

                try {
                    const imageResponse = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URI}/upload-image`, formData, {
                        headers: {
                            'Content-Type': 'multipart/form-data',
                        },
                    });

                    // Assuming the backend returns the image URL
                    colorObject.tones.push({ tone, shade: imageResponse.data.imageUrl });
                } catch (error) {
                    console.error(error);
                    alert('Image upload failed');
                    return;
                }
            }

            formattedArray.push(colorObject);
        }

        const productData = {
            productImage,
            title,
            description,
            price,
            colors: formattedArray,
        };

        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_API_BASE_URI}/upload`, productData);
            alert(response.data.message);
            if (response.data.message == 'Product uploaded successfully') {
                setLoading(false)
                router.push('/product')
            }
        } catch (error) {
            console.error(error);
            alert('Product upload failed');
        }
    };

    return (
        <div className="p-4 ">
            {loading && <Spinner />}
            <Sidebar />
            <div className='w-3/4 mx-auto'>
                <h1 className="text-2xl mb-4">Color Management System</h1>
                <div className="mb-4 flex  flex-col bg-white p-8 rounded-lg">
                    <div className='w-full flex flex-row justify-between items-center  '>
                        {/* ... Your other input fields ... */}
                        <label htmlFor="productImage" className="mr-2 md:text-2xl font-bold">
                            Upload Product Image:
                        </label>
                        <input
                            type="file"
                            id="productImage"
                            accept="image/*"
                            onChange={handleProductImageUpload}
                        />

                        {productImage && (
                            <img src={productImage} alt="Product" className="mt-2" style={{ maxWidth: '200px' }} />
                        )}
                    </div>
                    <label htmlFor="title" className="mr-2 md:text-2xl font-bold my-2">
                        Title:
                    </label>
                    <input
                        type="text"
                        id="title"
                        className=" rounded px-2 py-1 w-full border-2"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />


                    <label htmlFor="description" className="mr-2 md:text-2xl font-bold my-2 ">
                        Description:
                    </label>
                    <textarea
                        type="text"
                        id="description"
                        className=" rounded px-2 py-1 border-2"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <label htmlFor="price" className="mr-2 md:text-2xl font-bold my-2">
                        Price:
                    </label>
                    <input
                        type="number"
                        id="price"
                        className=" rounded px-2 py-1 border-2"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />


                </div>
                <div className='bg-white p-8 rounded-lg'>
                    <div className='flex flex-col md:flex-row my-8'>
                        <label htmlFor="inputFieldCount" className="mr-2 md:text-2xl font-bold ">
                            Number of Colors Available In Stock:
                        </label>
                        <input
                            type="number"
                            id="inputFieldCount"
                            className="border-2 rounded px-2 py-1"
                            value={inputFieldCount}
                            onChange={handleCountChange}
                        />
                    </div>
                    {colorRows.map((row, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap items-center mb-4">
                            {row.slice(0, 1).map((field, fieldIndex) => (
                                <div key={fieldIndex} className="mb-2 mr-2">
                                    <input
                                        type="text"
                                        placeholder={rowIndex === 0 && fieldIndex === 0 ? "Color Name" : "Tones"}
                                        value={field}
                                        className='border-2 px-3 py-2 rounded'
                                        onChange={(e) => handleInputChange(e, rowIndex, 0)}
                                    />
                                </div>
                            ))}
                            {row.slice(1).map((field, fieldIndex) => (
                                <div key={fieldIndex} className="mb-2 mr-2 flex flex-row justify-between overflow-auto items-baseline gap-2">
                                    {rowIndex === 0 ? (
                                        <input
                                            type="text"
                                            placeholder="Color Name"
                                            className='border-2 px-3 py-2 rounded'
                                            value={field}
                                            onChange={(e) => handleInputChange(e, rowIndex, fieldIndex + 1)}
                                        />
                                    ) : (
                                        <>
                                            <label htmlFor={`shade${rowIndex}-${fieldIndex}`} className="block mb-1">
                                                Shade {fieldIndex + 1}:
                                            </label>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                id={`shade${rowIndex}-${fieldIndex}`}
                                                onChange={(e) => handleImageUpload(e, rowIndex, fieldIndex + 1)}
                                            />
                                        </>
                                    )}
                                </div>
                            ))}
                            {rowIndex === currentRow && (
                                <>
                                    <button
                                        className="bg-green-500 text-white px-2 py-1 rounded"
                                        onClick={addRow}
                                    >
                                        Add Section
                                    </button>
                                    {colorRows.length > 1 && (
                                        <button
                                            className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                                            onClick={() => removeRow(rowIndex)}
                                        >
                                            Remove Section
                                        </button>
                                    )}
                                </>
                            )}
                        </div>
                    ))}
                </div>
                <div className='flex justify-end my-2 mx-2'>
                    <button onClick={check} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ColorManagementSystem;