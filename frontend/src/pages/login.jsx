import {useState, useEffect, Component} from 'react';
import { Link, useNavigate } from 'react-router';

import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import {useLoginMutation} from "../slice/user.api.slice.js";
import FormContainer from "../components/Form.container.jsx";
import {setCredentials} from "../slice/auth.slice.js";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [login, { isLoading }] = useLoginMutation();
  const { userInfo } = useSelector((state) => state.auth);


  useEffect(() => {
    if (userInfo) {
      navigate('/');
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      toast.success('login successfull')
      navigate('/');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>Sign In</h1>

      <form onSubmit={submitHandler}>
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
        <div className='mb-6'>
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

        {/* Submit Button */}
        <button
          disabled={isLoading}
          type='submit'
          className='w-full bg-blue-600 text-white py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed'
        >
          {isLoading ? 'Signing In...' : 'Sign In'}
        </button>
      </form>

      {/* Loader */}
      {isLoading && (
        <div className='mt-4'>
          <Loader />
        </div>
      )}

      {/* Register Link */}
      <div className='py-4 text-center'>
        <span className='text-gray-600'>New Customer? </span>
        <Link to='/register' className='text-blue-600 hover:text-blue-700 font-semibold'>
          Register
        </Link>
      </div>
    </FormContainer>
  );
};

export default Login;




// const [login] = useLoginMutation()
//
      // // User login button click করলে:

// await login({ email, password })
//     ↓
// 1. Action dispatch হয় → middleware chain এ যায়
//     ↓
// 2. redux-thunk → async action handle করে
//     ↓
// 3. apiSlice.middleware → API request পাঠায়
//     ↓
// 4. Response আসলে cache করে
//     ↓
// 5. Reducer update করে
//     ↓
// 6. UI automatically update হয়