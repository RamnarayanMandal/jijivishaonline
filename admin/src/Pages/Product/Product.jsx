import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Product = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { product } = location.state || {};
    const URI = import.meta.env.VITE_API_URL;

    const [enlargedImage, setEnlargedImage] = useState(null);

    if (!product) {
        return <p className="text-center text-lg font-semibold">No product data available.</p>;
    }

    const handleDelete = async () => {
        try {
            await axios.delete(`${URI}api/admin/product/${product._id}`, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });
            navigate('/products'); // Navigate to the product list page or other desired page
        } catch (error) {
            console.error("Error deleting product", error.message);
        }
    };

    const handleBack = () => {
        navigate(-1); // Go back to the previous page
    };

    const handleImageClick = (image) => {
        setEnlargedImage(image);
    };

    const closeEnlargedImage = () => {
        setEnlargedImage(null);
    };

    return (
        <div className="w-full">
            <div className='flex justify-end content-center items-center px-5 '>
                <button
                    onClick={handleBack}
                    className="bg-gray-500 text-white px-4 py-2 rounded mb-4 "
                >
                    Back
                </button>
            </div>
            <div className="p-4 w-full max-w-screen-lg mx-auto">


                <div className="flex flex-col md:flex-row">
                    {/* Image Section */}
                    <div className="md:w-1/2 mb-4 md:mb-0">
                        <img
                            src={`${URI}${product.thumbnail}`}
                            alt={product.title}
                            className="w-full h-auto object-cover cursor-pointer rounded-lg shadow-lg"
                            onClick={() => handleImageClick(product.thumbnail)}
                        />
                        <div className="mt-4 flex flex-wrap gap-2">
                            {product.images.map((image, index) => (
                                <img
                                    key={index}
                                    src={`${URI}${image}`}
                                    alt={`${product.title} additional image ${index + 1}`}
                                    className="w-24 h-24 object-cover cursor-pointer border border-gray-300 rounded-lg"
                                    onClick={() => handleImageClick(image)}
                                />
                            ))}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="md:w-1/2 md:pl-4">
                        <h1 className="text-2xl md:text-3xl font-bold mb-4">{product.title}</h1>

                        <p className="mb-4 text-sm md:text-base"><strong>Description:</strong> {product.description || 'No description available'}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Price:</strong> ${product.price}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Discount:</strong> {product.discount}%</p>
                        <p className="mb-4 text-sm md:text-base"><strong>SKU:</strong> {product.productCode}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Category:</strong> {product.category}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Subcategory:</strong> {product.subcategory}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Type of Product:</strong> {product.typeOfProduct}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Color:</strong> {product.color}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Fabric:</strong> {product.fabric}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Country of Origin:</strong> {product.countryOfOrigin}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Marketed By:</strong> {product.marketedBy}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Additional Info:</strong> {product.additionalInfo1 || 'N/A'}, {product.additionalInfo2 || 'N/A'}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Material Care:</strong> {product.materialCare.length > 0 ? product.materialCare.join(', ') : 'N/A'}</p>
                        <p className="mb-4 text-sm md:text-base"><strong>Disclaimer:</strong> {product.disclaimer || 'N/A'}</p>

                        <div className="mt-4 flex flex-col sm:flex-row sm:space-x-4">
                            <button
                                onClick={() => {
                                    navigate("/UpdateProduct", { state: { product } });
                                }}
                                className="bg-blue-500 text-white px-4 py-2 rounded shadow-lg hover:bg-blue-600 transition mb-2 sm:mb-0"
                            >
                                Update
                            </button>
                            <button
                                onClick={handleDelete}
                                className="bg-red-500 text-white px-4 py-2 rounded shadow-lg hover:bg-red-600 transition"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>

                {enlargedImage && (
                    <div className="fixed inset-0 z-40 bg-black bg-opacity-75 flex items-center justify-center" onClick={closeEnlargedImage}>
                        <img
                            src={`${URI}${enlargedImage}`}
                            alt="Enlarged"
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default Product;
