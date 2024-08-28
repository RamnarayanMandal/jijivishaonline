import React from 'react';

const Modal = React.forwardRef(({ isOpen, onClose, categoryData, expandedSubcategories, toggleSubcategories }, ref) => {
  if (!isOpen) return null;

  console.log(categoryData)

  return (
    <div ref={ref} className="fixed top-40 flex items-center justify-center  z-50 ">
      <div className="bg-white flex  p-6 md:p-8 rounded-lg shadow-lg w-full h-full md:w-3/4 md:h-3/4 lg:w-11/12 lg:h-[80vh] relative overflow-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-red-500 text-2xl hover:text-red-700 transition-colors"
        >
          &times;
        </button>
        <div className='w-96 flex justify-center content-center'>
          <h1 className='mt-2 font-serif font-bold text-3xl text-red-700 '>{categoryData[0].name}</h1>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categoryData.map((item, index) => (
            <div key={index} className="col-span-1">

              <h3 className="font-semibold text-xl mb-4 border-b pb-2  text-red-700">{item.subName}</h3>
              {item.categoriesData.map((category, idx) => (
                <div key={idx} className="mb-4">
                  <div
                    className="cursor-pointer text-blue-600 hover:text-blue-800 transition-colors"
                    onClick={() => toggleSubcategories(category.subcategories)}
                  >
                    {category.subcategories}
                  </div>
                  {expandedSubcategories[category.subcategories] && (
                    <ul className="ml-4 mt-2 list-disc list-inside">
                      {category.subcategoriesTypes.map((type, typeIdx) => (
                        <li key={typeIdx} className="text-gray-700 hover:text-gray-900 transition-colors">
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
});

export default Modal;
