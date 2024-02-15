import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../features/userSlice';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const [userDetails, setUserDetails] = useState({
    username: '',
    password: '',
  });
  const [userExistence, setUserExistence] = useState(true);

  const isUser = async () => {
    const res = await fetch('https://dummyjson.com/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username: userDetails.username,
        password: userDetails.password,
      }),
    });
    return res.json();
  };

  const handleLogin = async () => {
    const token = localStorage.getItem('token');

    try {
      const response = await isUser();

      if (token === response.token) {
        dispatch(setUser({ name: response.firstName, image: response.image }));
        navigation('/login');
      } else {
        const res=await isUser();
                if(res.message==='Invalid credentials'){
                    setUserExistence(false);
                    alert('Use users from dummy json');
                    window.location.reload();
                }
                else{
                    const res=await isUser();
                    const tokenFromResponse=res.token;
                    localStorage.setItem('token',tokenFromResponse);
                    dispatch(setUser({name:res.firstName,image:res.image}));
                    navigation('/login');
                }    
      }
    } catch (error) {
      // Handle fetch error or invalid credentials
      console.error(error);
      setUserExistence(false);
    }
  };

  return (
    <div className='h-screen grid place-items-center'>
      <div className='h-[50%] w-[90%] bg-blue-400 text-white text-sm rounded-3xl md:h-[50%] md:w-[50%] lg:h-[70%] lg:w-[50%]'>
        <div className='flex flex-col justify-between items-center h-full w-full font-bold ml-2 md:text-3xl md:text-bold'>
          <div className='mt-5 mb-5 w-full rounded-3xl text-center'>
            {!userExistence ? (
              <div>
                <h1 className='text-red-800 mb-4'>User is not authorized</h1>
              </div>
            ) : (
              <div></div>
            )}
            <h1>Login Page</h1>
          </div>

          <div className='flex gap-4 items-center mr-2'>
            <label>Enter Username</label>
            <input
              onChange={(e) =>
                setUserDetails((prevDetails) => ({ ...prevDetails, username: e.target.value }))
              }
              type='text'
              className='rounded-2xl text-center p-2 text-black'
              placeholder='Enter Username'
            />
          </div>
          <div className='flex gap-4 items-center mr-2'>
            <label>Enter Password</label>
            <input
              type='password'
              className='rounded-2xl text-center p-2 text-black'
              onChange={(e) =>
                setUserDetails((prevDetails) => ({ ...prevDetails, password: e.target.value }))
              }
              placeholder='Enter Password'
            />
          </div>
          <button
            className='mb-5 bg-blue-300 p-4 rounded-3xl hover:bg-blue-200'
            onClick={handleLogin}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Home;
