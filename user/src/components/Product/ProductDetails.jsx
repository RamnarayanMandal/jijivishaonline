import React, { useState, useEffect } from "react";
import { StarIcon } from "@heroicons/react/20/solid";
import { Radio, RadioGroup } from "@headlessui/react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SubCategories } from "../catogry/SubCategories";
import { RecentlyViewedProduct } from "./RecentlyViewedProduct";

// Function to generate class names
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ProductDetails() {
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState(null);
  const [selectedSize, setSelectedSize] = useState(null);
  const [isAdditionalInfoExpanded, setIsAdditionalInfoExpanded] =
    useState(false);
  const [quantity, setQuantity] = useState(1);
  const { id } = useParams();
  const URI = import.meta.env.VITE_API_URL;

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${URI}api/admin/products/${id}`);
        setProduct(response.data.product); // Corrected to match API response
        // Initialize default selected color and size
        setSelectedColor(response.data.product.color); // Assuming single color
        setSelectedSize(response.data.product.size[0]); // Assuming first size as default
      } catch (error) {
        console.error("Error fetching the product:", error);
      }
    };

    fetchProduct();
  }, [id, URI]);

  if (!product) {
    return <div>Loading...</div>;
  }

  const reviews = { href: "#", average: 4, totalCount: 117 }; // Placeholder reviews

  return (
    <div className="bg-white">
      <div className="pt-6">
        {/* Breadcrumbs */}
        <nav aria-label="Breadcrumb">
          <ol
            role="list"
            className="mx-auto flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
          >
            {/* Assuming breadcrumb data is available */}
            {product.breadcrumbs?.map((breadcrumb) => (
              <li key={breadcrumb.id}>
                <div className="flex items-center">
                  <a
                    href={breadcrumb.href}
                    className="mr-2 text-sm font-medium text-gray-900"
                  >
                    {breadcrumb.name}
                  </a>
                  <svg
                    fill="currentColor"
                    width={16}
                    height={20}
                    viewBox="0 0 16 20"
                    aria-hidden="true"
                    className="h-5 w-4 text-gray-300"
                  >
                    <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                  </svg>
                </div>
              </li>
            ))}
            <li className="text-sm">
              <a
                href="#"
                aria-current="page"
                className="font-medium text-gray-500 hover:text-gray-600"
              >
                {product.title}
              </a>
            </li>
          </ol>
        </nav>

        {/* Image gallery */}
        <div className="mx-auto mt-6 max-w-2xl sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:gap-x-8 lg:px-8">
          <div className="aspect-h-4 aspect-w-3 hidden overflow-hidden rounded-lg lg:block">
            <img
              alt="Product image"
              src={`${URI}${product.thumbnail}`}
              className="h-40 w-40 object-cover object-center"
            />
          </div>
          <div className="hidden lg:grid lg:grid-cols-1 lg:gap-y-8">
            {product.images.map((image, index) => (
              <div
                key={index}
                className="aspect-h-2 aspect-w-3 overflow-hidden rounded-lg"
              >
                <img
                  alt={`Product image ${index + 1}`}
                  src={`${URI}${image}`}
                  className="h-40 w-40 object-cover object-center"
                />
              </div>
            ))}
          </div>
          <div className="aspect-h-5 aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden sm:rounded-lg">
            <img
              alt="Product image"
              src={`${URI}${product.images[1]}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
        </div>

        {/* Product info */}
        <div className="mx-auto max-w-2xl px-4 pb-16 pt-10 sm:px-6 lg:grid lg:max-w-7xl lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8 lg:px-8 lg:pb-24 lg:pt-16">
          <div className="lg:col-span-2 lg:border-r lg:border-gray-200 lg:pr-8">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
              {product.title}
            </h1>
          </div>

          {/* Options */}
          <div className="mt-4 lg:row-span-3 lg:mt-0">
            <h2 className="sr-only">Product information</h2>
            <p className="text-3xl tracking-tight text-gray-900">
              ${product.price} ({product.discount}%)
            </p>
            <div className="mt-4">
              <p className="text-sm text-gray-500">
                Product Code: {product.productCode}
              </p>
            </div>

            {/* Reviews */}
            <div className="mt-6">
              <h3 className="sr-only">Reviews</h3>
              <div className="flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      aria-hidden="true"
                      className={classNames(
                        reviews.average > rating
                          ? "text-gray-900"
                          : "text-gray-200",
                        "h-5 w-5 flex-shrink-0"
                      )}
                    />
                  ))}
                </div>
                <p className="sr-only">{reviews.average} out of 5 stars</p>
                <a
                  href={reviews.href}
                  className="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                >
                  {reviews.totalCount} reviews
                </a>
              </div>
            </div>

            <form className="mt-10">
              {/* Colors */}
              <div>
                <h3 className="text-sm font-medium text-gray-900">Color</h3>

                <fieldset aria-label="Choose a color" className="mt-4">
                  {/* Assuming color is a single value, adjust logic if it's a list */}
                  <RadioGroup
                    value={selectedColor}
                    onChange={setSelectedColor}
                    className="flex items-center space-x-3"
                  >
                    <Radio
                      key={product.color}
                      value={product.color}
                      aria-label={product.color}
                      className={classNames(
                        "bg-red-500",
                        "relative -m-0.5 flex cursor-pointer items-center justify-center rounded-full p-0.5 focus:outline-none"
                      )}
                    >
                      <span
                        aria-hidden="true"
                        className="h-8 w-8 rounded-full border border-black border-opacity-10 bg-red-500"
                      />
                    </Radio>
                  </RadioGroup>
                </fieldset>
              </div>

              <div className="flex justify-items-stretch gap-10 content-center items-center">
                {/* Sizes */}
                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-900">Size</h3>
                  <fieldset aria-label="Choose a size" className="mt-4">
                    <RadioGroup
                      value={selectedSize}
                      onChange={setSelectedSize}
                      className="flex flex-wrap gap-4"
                    >
                      {product.size.map((size) => (
                        <Radio
                          key={size}
                          value={size}
                          className={classNames(
                            "cursor-pointer h-[40px] w-[40px] rounded-md border py-2 px-4 text-sm font-medium uppercase shadow-sm",
                            selectedSize === size
                              ? "border-indigo-500 bg-indigo-100 text-indigo-600"
                              : "border-gray-300 text-gray-900"
                          )}
                        >
                          {size}
                        </Radio>
                      ))}
                    </RadioGroup>
                  </fieldset>
                </div>

                {/* Quantity */}
                <div className="mt-5">
                  <h3 className="text-sm font-medium text-gray-900 mb-4">
                    Quantity
                  </h3>
                  <div className="mt-2 flex items-center space-x-4">
                    <button
                      type="button"
                      onClick={() =>
                        setQuantity((prev) => Math.max(prev - 1, 1))
                      }
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    <span className="text-lg font-medium text-gray-900">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((prev) => prev + 1)}
                      className="flex h-10 w-10 items-center justify-center rounded-md border border-gray-300 bg-gray-100 text-gray-500 hover:bg-gray-200"
                    >
                      <svg
                        className="h-5 w-5"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 4a1 1 0 011 1v10a1 1 0 11-2 0V5a1 1 0 011-1z"
                          clipRule="evenodd"
                        />
                        <path
                          fillRule="evenodd"
                          d="M4 10a1 1 0 011-1h10a1 1 0 110 2H5a1 1 0 01-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
              {/* Add to cart */}
              <div className="flex justify-center gap-4 items-center content-center">
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-indigo-600 px-8 py-3 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Add to cart
                </button>
                <button
                  type="submit"
                  className="mt-10 flex w-full items-center justify-center rounded-md border border-transparent bg-red-600 px-8 py-3 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Buy Now
                </button>
              </div>
            </form>
          </div>

          <div className="py-10 lg:col-span-2 lg:col-start-1 lg:border-r lg:border-gray-200 lg:pt-6 lg:pb-16 lg:pr-8">
            {/* Description and details */}
            <div>
              <h3 className="sr-only">Description</h3>

              <div className="space-y-6">
                <p className="text-base text-gray-900">{product.description}</p>
              </div>
            </div>

            <button
              onClick={() =>
                setIsAdditionalInfoExpanded(!isAdditionalInfoExpanded)
              }
              className="text-lg font-medium text-indigo-600 hover:text-indigo-500 mt-4"
            >
              {isAdditionalInfoExpanded ? "Close" : "Additional Information"}
            </button>
            {isAdditionalInfoExpanded && (
              <>
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Additional Information
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-gray-600">
                    <li>{product.additionalInfo1}</li>
                    <li>{product.additionalInfo2}</li>
                  </ul>
                </div>

                {/* Marketing, Fabric, and Care */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Marketed By
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    {product.marketedBy}
                  </p>

                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    Fabric
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    {product.fabric}
                  </p>

                  <h3 className="mt-6 text-lg font-medium text-gray-900">
                    Material Care
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-gray-600">
                    {product.materialCare.map((care, index) => (
                      <li key={index}>{care}</li>
                    ))}
                  </ul>
                </div>

                {/* Disclaimer */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Disclaimer
                  </h3>
                  <p className="mt-4 text-base text-gray-600">
                    {product.disclaimer}
                  </p>
                </div>

                {/* Shipping Information */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">
                    Shipping Information
                  </h3>
                  <ul className="mt-4 list-disc space-y-2 pl-4 text-sm text-gray-600">
                    {product.shippingInfo.map((info, index) => (
                      <li key={index}>{info}</li>
                    ))}
                  </ul>
                </div>

                {/* Note */}
                <div className="mt-6">
                  <h3 className="text-lg font-medium text-gray-900">Note</h3>
                  <p className="mt-4 text-base text-gray-600">{product.note}</p>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-col justify-center items-center sm:px-[6%]  my-10 sm:py-10  font-serif px-8 bg-[#e7e6e6]">
         <h1 className="lg:text-4xl text-2xl text-center font-semibold text-gray-600 mb-6">
          Recently Viewed Products
        </h1>
      <RecentlyViewedProduct subcategory={product.subcategory} />
      </div>
    </div>
  );
}
