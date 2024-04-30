import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Navbar from './navbar';
import { useDispatch } from 'react-redux';
import { add } from '../../store/cartSlice';

const Products = () => {
    const dispatch = useDispatch();
    const [products, setProducts] = useState([]);
    const [disabled, setDisabled] = useState(true)
    const [tones, setTones] = useState([]);
    const [shades, setShades] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get(`${process.env.NEXT_PUBLIC_API_BASE_URI}/products`);
            const check = response.data;
            console.log(check)
            setProducts(check);

            // Initialize tones and shades arrays with default values
            setTones(new Array(check.length).fill(0));
        };

        fetchData();
    }, []);

    const shade = (index, cardIndex) => {
        // Update the tone for the specific card index
        setTones((prevTones) => {
            const newTones = [...prevTones];
            newTones[cardIndex] = index;
            return newTones;
        });
    };

    const handleAdd = (product, cardIndex) => {
        const finalproduct = {
            id: product._id,
            title: product.title,
            description: product.description,
            image: product.productImage,
            price: product.price,
            color: product.colors[tones[cardIndex]].color,
            tone: product.colors[tones[cardIndex]].tones[tones[0]]?.tone,
            shade: shades,
        };
        dispatch(add(finalproduct));
    };

    return (
        <div className="container mx-auto">
            <Navbar />
            <h1 className="text-5xl text-center my-8">Products</h1>
            <div className="flex flex-col md:flex-row justify-between flex-wrap gap-4 px-8">
                {products ? (
                    products.map((element, cardIndex) => {
                        return (
                            <div key={cardIndex} className="md:w-1/3 lg:w-1/4 rounded-lg hover:shadow-2xl w-full bg-white">
                                <img src={element.productImage} alt={element.title} className="w-full rounded-lg" />
                                <h1 className="mx-4 my-6">{element.title}</h1>
                                <p className="m-4">{element.description}</p>
                                <h2 className="text-xl font-semibold p-2">Colors Available:</h2>
                                <ul className="flex flex-row gap-4 w-full px-6 overflow-auto">
                                    {element.colors.map((color, colorindex) => (
                                        <li
                                            key={colorindex}
                                            className={`${colorindex === tones[cardIndex] ? 'bg-blue-500' : 'bg-gray-100'
                                                } px-4 py-2 rounded-md cursor-pointer `}
                                            onClick={() => {
                                                setDisabled(false);
                                                shade(colorindex, cardIndex);
                                            }}
                                        >
                                            {color.color}
                                        </li>
                                    ))}
                                </ul>
                                <h3 className="text-lg font-semibold px-10 py-2">{element.colors[tones[cardIndex]]?.color}</h3>
                                <div className="flex flex-row overflow-auto justify-around items-center">
                                    <p className="text-gray-700">{element.colors[tones[cardIndex]]?.tones[0]?.tone}</p>
                                    {element.colors[tones[cardIndex]]?.tones.map((tone, toneindex) => (
                                        <div
                                            key={toneindex}
                                            className="flex flex-row mb-2 overflow-auto"
                                            onClick={() => {
                                                setDisabled(false);
                                                setShades(tone.shade);
                                            }}
                                        >
                                            <img src={tone.shade} alt={tone.tone} className="rounded-full w-10 h-10" />
                                        </div>
                                    ))}
                                </div>
                                <div className="mx-auto py-4 w-3/4">
                                    <button
                                        className={`${disabled ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} w-full text-white font-bold py-2 px-4 rounded`}
                                        onClick={() => handleAdd(element, cardIndex)}
                                    >
                                        Add to Cart
                                    </button>
                                </div>
                            </div>
                        );
                    })
                ) : (
                    <h1 className="text-3xl">No Products </h1>
                )}
            </div>
        </div>
    );
};

export default Products;
