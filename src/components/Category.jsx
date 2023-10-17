import { useState } from 'react';
import Close from '/close.svg'
function Category({ categories, onCreateCategory, onCategoryDelete,  onCategorySelect }) {
  const [newCategory, setNewCategory] = useState('');
  const [userCategory, setUserCategory] = useState('');

  const handleCreateCategory = () => {
    if (newCategory.trim() !== '') {
      onCreateCategory(newCategory);
      setNewCategory('');
    }
  };

  const handleUserCategoryChange = (e) => {
    setUserCategory(e.target.value);
  };

  const handleAddUserCategory = () => {
    if (userCategory.trim() !== '') {
      onCreateCategory(userCategory);
      setUserCategory('');
    }
  };

  return (
    <div className="lg:mt-16">
      <div className='bg-gray-100 p-4 rounded shadow-lg'>
      <h2 className="text-2xl font-semibold mb-4">Categories</h2>
      <ul className="list-disc mb-4">
        {categories.map((category, index) => (
          <li
            key={index}
            className="flex justify-between items-center py-1"
            onClick={() => onCategorySelect(category)} // Add onClick handler
            style={{ cursor: 'pointer' }} // Set cursor to pointer
          >
            <span>{category}</span>
            <button
              onClick={() => onCategoryDelete(index)}
              className="p-1 bg-red-300 rounded-full"
            >
             <img src={Close} alt="close" className='w-5 h-5'/>
            </button>
          </li>
        ))}
      </ul>
      <div className="mb-4">
        <input
          type="text"
          placeholder="New Category"
          value={newCategory}
          onChange={(e) => setNewCategory(e.target.value)}
          className="w-2/3 p-2 mb-2 border border-gray-300 rounded focus:outline-none focus:ring focus:border-blue-300"
        />
        <button
          onClick={handleCreateCategory}
          className="bg-blue-500 text-white py-1.5 px-4 rounded hover:bg-blue-600 focus:outline-none focus:ring focus:bg-blue-400"
        >
          Create Category
        </button>
      </div>
      <h3 className="text-md font-semibold mb-2">Add Your Own Category</h3>
      </div>
      
    </div>
  );
}

export default Category;
