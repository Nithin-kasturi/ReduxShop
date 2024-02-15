import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import ItemCard from '../components/ItemCard';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../features/userSlice';
export default function Login() {
  const items=useSelector((store)=>store.userSlice.items) || [];
  // const [items, setItems] = useState([]);
  const dispatch=useDispatch();
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const response = await fetch('https://dummyjson.com/products');
    const result = await response.json();
    const items=result.products;
    dispatch(setItems({items}));
  };
  return (
    <div>
      <Navbar />
      <div className='mt-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 gap-4'>
        {items.length > 0 &&
          items.map((item, index) => {
            return <ItemCard key={index} item={item} />;
          })}
      </div>
    </div>
  );
}
