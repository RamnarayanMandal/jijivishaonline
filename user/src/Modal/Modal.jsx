import React from 'react';

const Modal = ({ isOpen, onClose, categoryData }) => {
  if (!isOpen) return null;

  return (
    <div className='fixed inset-0 flex justify-center items-center z-50 bg-gray-800 bg-opacity-50'>
      <div className='bg-white p-4 rounded-lg shadow-lg w-auto max-w-4xl relative'>
        <button
          className='absolute top-0 right-3 text-gray-600 text-2xl'
          onClick={onClose}
        >
          &times;
        </button>
        <div className='flex flex-wrap'>
          {categoryData.map((item, index) => (
            <div
              key={index}
              className='flex-1 min-w-[200px] mb-4 px-2'
            >
              {item.subName && (
                <div className='text-red-500 font-semibold mb-2'>
                  {item.subName}
                </div>
              )}
              <ul>
                {item.subcategories.map((subcategory, subIndex) => (
                  <li
                    key={subIndex}
                    className='px-4 py-2 text-gray-700 hover:bg-gray-100'
                  >
                    {subcategory}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Modal;
