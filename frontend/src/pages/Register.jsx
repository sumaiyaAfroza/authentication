import React, {useEffect, useState} from 'react';
import {Link, useNavigate} from "react-router";
import {useRegisterMutation} from "../slice/user.api.slice.js";
import {toast} from "react-toastify";
import {useDispatch, useSelector} from "react-redux";
import FormContainer from "../components/Form.container.jsx";
import Loader from "../components/Loader.jsx";
import {setCredentials} from "../slice/auth.slice.js";

const Register = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [register ,{isLoading}] = useRegisterMutation()
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  // এই useEffect টি করছে:
  // Component mount হওয়ার সাথে সাথে check করছে user already logged in আছে কিনা
  // যদি user ইতিমধ্যে logged in থাকে, তাহলে তাকে সরাসরি home page এ নিয়ে যাবে
  // এটি browser back button এর সমস্যা solve করে

  const submitHandler = async (e) => {
    e.preventDefault()
    if(password !== confirmPassword) {
      toast.error('password not match')
    }
    else {
      try {
        const res = await register({name,email, password}).unwrap()
        dispatch(setCredentials({...res}))  /*Redux এ সবসময় dispatch(actionCreator(payload)) pattern follow করতে হয়।*/
        toast.success('registration successfull')
       navigate('/')
      } catch (error) {
        toast.error(error?.data?.message || error.error)
      }
    }
  }

  return (
    <FormContainer>
      <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Register</h1>

      <form onSubmit={submitHandler}>
        {/* Name Field */}
        <div className='mb-4'>
          <label htmlFor='name' className='block text-gray-700 font-semibold mb-2'>
            Name
          </label>
          <input
            type='text'
            id='name'
            placeholder='Enter name'
            value={name}
            onChange={(e) => setName(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Email Field */}
        <div className='mb-4'>
          <label htmlFor='email' className='block text-gray-700 font-semibold mb-2'>
            Email Address
          </label>
          <input
            type='email'
            id='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Password Field */}
        <div className='mb-4'>
          <label htmlFor='password' className='block text-gray-700 font-semibold mb-2'>
            Password
          </label>
          <input
            type='password'
            id='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Confirm Password Field */}
        <div className='mb-6'>
          <label htmlFor='confirmPassword' className='block text-gray-700 font-semibold mb-2'>
            Confirm Password
          </label>
          <input
            type='password'
            id='confirmPassword'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className='w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
            required
          />
        </div>

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Registering...' : 'Register'}
        </button>

        {/* Loader */}
        {isLoading && (
          <div className='mt-4'>
            <Loader/>
          </div>
        )}
      </form>

      {/* Login Link */}
      <div className='py-4 text-center'>
        <span className='text-gray-600'>Already have an account? </span>
        <Link to='/login' className='text-blue-600 hover:text-blue-700 font-semibold'>
          Login
        </Link>
      </div>
    </FormContainer>
  );
};

export default Register;