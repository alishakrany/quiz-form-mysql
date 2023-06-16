import React, { useEffect, useState } from 'react';
import { firestore } from '../Services/firebaseConfig';

const CategorySelection = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoriesRef = firestore.collection('categories');
        const snapshot = await categoriesRef.get();
        const categoriesData = snapshot.docs.map(doc => doc.data());
        setCategories(categoriesData);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  return (
    <div>
      <label>اختر الفئة:</label>
      <select>
        {categories.map(category => (
          <option key={category.id} value={category.id}>{category.name}</option>
        ))}
      </select>
    </div>
  );
};

export default CategorySelection;
