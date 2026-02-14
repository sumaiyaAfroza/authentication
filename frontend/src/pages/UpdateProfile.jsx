import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { useNavigate } from "react-router";
import { setCredentials } from "../slice/auth.slice.js";
import FormContainer from "../components/Form.container.jsx";
import Loader from "../components/Loader.jsx";
import { useUpdateProfileMutation } from "../slice/user.api.slice.js";

const UpdateProfile = () => {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // ✅ এটা যোগ করুন

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);
  const [updateProfile, { isLoading }] = useUpdateProfileMutation()

  useEffect(() => {
    setName(userInfo.name);
    setEmail(userInfo.email);
  }, [userInfo.email, userInfo.name]);

  const submitHandler = async (e) => {
    e.preventDefault();

    // ✅ Current password check
    if (!currentPassword) {
      toast.error('Current password is required');
      return;
    }

    try {
      const res = await updateProfile({
        currentPassword, // ✅ এটা পাঠান
        name,
        email
      }).unwrap();

      dispatch(setCredentials(res));
      navigate('/')
      toast.success('Profile updated successfully');
    } catch (err) {
      toast.error(err?.data?.message || err.error);
    }
  };

  return (
    <FormContainer>
      <h1 className='text-3xl font-bold text-center mb-6 text-gray-800'>
        Update Profile
      </h1>

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

        {/* Current Password Field - ✅ এটা যোগ করুন */}
        <div className='mb-4'>
          <label htmlFor='currentPassword' className='block text-gray-700 font-semibold mb-2'>
            Current Password (Required)
          </label>
          <input
            type='password'
            id='currentPassword'
            placeholder='Enter current password'
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
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
          {isLoading ? 'Updating...' : 'Update'}
        </button>

        {isLoading && (
          <div className='mt-4'>
            <Loader/>
          </div>
        )}
      </form>
    </FormContainer>
  );
};

export default UpdateProfile;