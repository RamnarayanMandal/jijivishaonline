import { Button } from '@/components/ui/button';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const NavbarCatogry = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const navagite = useNavigate()

  // Fetch data from API
  useEffect(() => {
    fetch('http://localhost:5001/api/navbar/categories')
      .then(response => response.json())
      .then(data => setData(data))
      .catch(error => console.error('Error fetching data:', error));
  }, []);

  // Handle search input change
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value.toLowerCase());
  };

  // Filter data based on search query
  const filteredData = data.filter(item => 
    item.category.toLowerCase().includes(searchQuery) ||
    item.subCategory.toLowerCase().includes(searchQuery) ||
    item.subCategoryData.some(sub =>
      sub.name.toLowerCase().includes(searchQuery) ||
      sub.types.some(type => type.toLowerCase().includes(searchQuery))
    )
  );

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif', width: "100%" }}>
      <h1 className='text-2xl font-semibold my-4'>NavBar Management</h1>
      <div className='flex justify-between gap-2 flex-wrap items-center'>
        <input
          type="text"
          placeholder="Search..."
          value={searchQuery}
          onChange={handleSearchChange}
          style={{
            flex: 1,
            maxWidth: '300px',
            padding: '10px',
            marginBottom: '20px',
            borderRadius: '5px',
            border: '1px solid #ddd',
            outline: 'none',
          }}
        />
        <Button onClick={()=>navagite("/addCategory")}>Add Category</Button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr style={{ backgroundColor: '#f4f4f4' }}>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Category</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subcategory</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Subcategory Data</th>
            <th style={{ border: '1px solid #ddd', padding: '8px' }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.map(item => (
            <tr key={item._id}>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.category}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>{item.subCategory}</td>
              <td style={{ border: '1px solid #ddd', padding: '8px' }}>
                {item.subCategoryData.map(sub => (
                  <div key={sub._id}>
                    <strong>{sub.name}:</strong>
                    <ul>
                      {sub.types.map((type, index) => (
                        <li key={index}>{type}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </td>
              <td style={{ border: '1px solid #ddd', padding: '8px', textAlign: 'center' }}>
                <Button
                  style={{ marginRight: '5px' }}
                  onClick={() => console.log('Edit', item._id)}
                >
                  Update
                </Button>
                <Button
                  onClick={() => console.log('Delete', item._id)}
                  style={{ backgroundColor: '#f44336', color: '#fff' }}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
