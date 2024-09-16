import React from "react";
import CloseIcon from "@mui/icons-material/Close";

const Modal = React.forwardRef(
  (
    {
      isOpen,
      onClose,
      categoryData,
      expandedSubcategories,
      toggleSubcategories,
    },
    ref
  ) => {
    if (!isOpen || !categoryData || categoryData.length === 0) return null;

    return (
      <div
        ref={ref}
        className="fixed top-0 left-0 flex items-center justify-center w-full h-full z-50 bg-black bg-opacity-50 transition-opacity duration-300 ease-in-out"
        style={{
          animation: isOpen ? "fadeIn 0.5s ease-out" : "fadeOut 0.4s ease-in",
        }}
      >
        <div
          className="bg-white flex flex-col p-4 md:p-8 rounded-lg shadow-lg w-full h-full md:w-3/4 md:h-3/4 lg:w-11/12 lg:h-[80vh] relative overflow-auto transition-transform duration-500 ease-out"
          style={{
            animation: isOpen
              ? "slideUp 0.3s ease-out"
              : "slideDown 0.3s ease-in",
          }}
        >
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-red-500 hover:text-red-700 transition-colors"
          >
            <CloseIcon className="text-3xl" />
          </button>

          {/* Only show this heading on medium and larger screens */}
          {categoryData[0] && (
            <div className="hidden md:flex md:w-96 md:justify-center md:content-center">
              <h1 className="mt-2 font-serif font-bold text-2xl md:text-3xl text-red-700">
                {categoryData[0].name}
              </h1>
            </div>
          )}

          {/* Responsive Grid Layout */}
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {categoryData.map((item, index) => (
              <div key={index} className="col-span-1">
                <h3 className="font-semibold text-lg md:text-xl mb-2 md:mb-4 border-b pb-1 md:pb-2 text-red-700">
                  {item.subName || item.subCategory} {/* Fallback to subCategory */}
                </h3>
                {item.subCategoryData && item.subCategoryData.map((category, idx) => (
                  <div key={idx} className="mb-2 md:mb-4">
                    <div
                      className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                      onClick={() =>
                        toggleSubcategories(category.name)
                      }
                    >
                      {category.name}
                    </div>
                    {expandedSubcategories[category.name] && (
                      <ul className="ml-4 mt-1 md:mt-2 list-disc list-inside">
                        {category.types.map((type, typeIdx) => (
                          <li
                            key={typeIdx}
                            className="text-gray-700 hover:text-gray-900 transition-colors"
                          >
                            {type}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
);

export default Modal;
