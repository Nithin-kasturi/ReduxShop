import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { FaShoppingCart } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import { setItems } from '../features/userSlice';
export default function Navbar() {
    const name=useSelector((store)=>store.userSlice.name);
    const image=useSelector((store)=>store.userSlice.image);
    const totalItems=useSelector((store)=>store.basketSlice.totalItems);
    const totalCost=useSelector((store)=>store.basketSlice.totalCost);
    const [filter,setFilter]=useState('Filter');
    const dispatch=useDispatch();
    const handleChange = async (e) => {
      let searchTerm = e.target.value.toLowerCase();
      const response = await fetch('https://dummyjson.com/products');
      const result = await response.json();
      const items = result.products;
      let filteredItems;
      if (searchTerm === '') {
        filteredItems = items;
      } else {
        const range=filter.split('-');
        let first=parseInt(range[0],10);
        let second=parseInt(range[1],10);
        if(filter==="Filter"){
          first=0;
          second=Infinity;
        }
        filteredItems = items.filter((item) => 
        (item.brand.toLowerCase().includes(searchTerm) || (item.title.toLowerCase().includes(searchTerm))
         ) && (item.price>=first && item.price<=second) 
        
        );
      }
      dispatch(setItems({items:filteredItems}));
    };
  return (
    <div className='flex justify-between border-b-2 border-black pb-2'>
        <div className='flex flex-row items-center gap-5'>
            <h1 className='text-sm hidden md:flex md:font-bold md:text-3xl md:gap-4'>Hi<h1 className='text-red-400 '>{name}</h1> !!</h1>
            <img src={image} className='h-[50px] md:h-[70px]'/>
        </div>
        <div className='flex items-center gap-2'>
          <input type='text' onChange={handleChange} className='h-[30px] w-[100px]  md:w-[500px] border-2 border-gray-500 rounded-2xl text-center' placeholder='Have something in Mind?'/>
          <FaSearch  size={25} className='hidden md:block'/>
        </div>
        <div className='flex items-center gap-1 mr-3'>
            <span className='hidden font-semibold md:block'>Filter based on price</span>
            <select onChange={(e)=>setFilter(e.target.value)} className='h-[30px] text-center rounded-2xl bg-black text-white '>
              <option selected>Filter</option>
              <option>0-100</option>
              <option>101-500</option>
              <option>501-1000</option>
              <option>1001-1500</option>
            </select>
            <span className='font-bold text-sm flex  items-center md:text-xl md:gap-2'>Cart <h1 className='text-red-500 text-sm md:text-2xl'>{totalItems}</h1></span>
            <h1 className='font-bold text-sm flex  items-center md:text-xl md:gap-2'>Total<h1 className='text-red-500 text-sm md:text-2xl'>{totalCost}</h1></h1>            
        </div>
    </div>
  )
}
