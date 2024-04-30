
"use client"
import React from 'react';

const ProductDetail = ({ product, onBackClick, onDelete }) => {

    return (
        <div className="w-3/4 mx-auto p-4">
            <div className="bg-white rounded-lg shadow-lg p-6">
                <h1 className="text-2xl font-semibold mb-4">{product.title}</h1>
                <div className="flex flex-wrap">
                    <div className="w-full md:w-1/2 lg:w-1/3 mb-4">
                        <img
                            src={product.productImage}
                            alt={product.title}
                            className="rounded-lg"
                        />
                    </div>
                    <div className="w-full md:w-1/2 lg:w-2/3 mb-4">
                        <p className="text-gray-600 text-lg mb-2">{product.description}</p>
                        <p className="text-gray-800 text-xl font-semibold mb-2">
                            Price: ${product.price}
                        </p>
                        <h2 className="text-xl font-semibold mb-2">Colors Available:</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                            {product.colors.map((color) => (
                                <li
                                    key={color._id}
                                    className="bg-gray-100 rounded-lg p-4 shadow-md"
                                >
                                    <h3 className="text-lg font-semibold mb-2">{color.color}</h3>
                                    <div className="flex flex-wrap">
                                        {color.tones.map((tone) => (
                                            <div
                                                key={tone._id.$oid}
                                                className="w-1/2 mb-2"
                                            >
                                                <img
                                                    src={tone.shade}
                                                    alt={tone.tone}
                                                    className="rounded-lg"
                                                />
                                                <p className="text-gray-700">{tone.tone}</p>
                                            </div>
                                        ))}
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className='my-8 flex flex-col md:flex-row gap-4'>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onBackClick}
                    >
                        Back to Table
                    </button>
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                        onClick={onDelete}
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;

