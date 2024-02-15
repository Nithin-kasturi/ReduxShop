import React from 'react'
import { TbPercentage } from "react-icons/tb";
import { useDispatch } from 'react-redux';
import { decrement, increment } from '../features/basketSlice';
export default function ItemCard({item}) {
  const dispatch=useDispatch();
  return (
    <div className='bg-white h-[300px] border-2 border-black rounded-3xl'>
      <div className='mt-2 grid place-items-center font-bold'>
          <h1>{item.title}</h1>
          <img src={item.images[0]} className='mt-2 h-[100px] rounded-2xl'/>
      </div>
      <div className='mt-4 flex gap-3 font-semibold text-sm ml-2 mr-2  justify-between  md:text-lg'>
        <h1 className='flex gap-1'>Brand : <h1 className='text-blue-600'>{item.brand}</h1></h1>
        <h1 className='flex items-center'>In Stock : <h1 className='text-blue-600'>{item.stock}</h1></h1>
        <h1 className='flex  items-center'>Rating : ❤️️  {item.rating}</h1>
      </div>
      <div className='mt-4 ml-2 gap-3 flex font-bold text-sm items-center justify-between mr-2 md:text-lg'>
        <h1 className='flex gap-1'>Price : <h1 className='text-red-600'>{item.price}</h1>$</h1>
        <h1 className='flex gap-1 items-center'>Discount <h1 className='text-blue-600'> {item.discountPercentage}</h1><TbPercentage />  </h1>
      </div>
      <div className='flex '>
        <button onClick={()=>{dispatch(increment({item:item.title,cost:item.price}))}} className='bg-blue-500 p-3 rounded-3xl mt-5 w-[50%] hover:bg-blue-300 text-white font-semibold'>Add to cart</button>
        <button  onClick={()=>{dispatch(decrement({item:item.title,cost:item.price}))}} className='bg-red-500 p-3 rounded-3xl mt-5 w-[50%] hover:bg-red-300 text-white font-semibold'>Remove from cart</button>
      </div>
    </div>
  )
}
