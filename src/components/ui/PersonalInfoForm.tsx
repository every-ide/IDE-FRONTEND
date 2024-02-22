import React from 'react';
import { useForm } from 'react-hook-form';
import AuthInput from '@/components/auth/AuthInput'; // Adjust import as necessary
import { toast } from 'react-toastify';
import useAxiosPrivate from '@/src/hooks/useAxiosPrivate';
import Header from '../my/Header';
import useUserStore from '@/src/store/useUserStore';

const PersonalInfoForm = () => {
  const { user } = useUserStore();
  const axiosPrivate = useAxiosPrivate();
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    setValue, // Add this to use setValue
  } = useForm({
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      oldPassword: '', // Add this
      newPassword: '',
      confirmPassword: '',
    },
    mode: 'onChange',
  });

  const onSubmit = async (data: any) => {
    const { email, oldPassword, newPassword, confirmPassword, name } = data;
    if (newPassword !== confirmPassword) {
      setError('confirmPassword', {
        type: 'manual',
        message: 'Passwords do not match',
      });
      return;
    }

    try {
      const response = await axiosPrivate.patch('/user/info', {
        email,
        oldPassword, // Include oldPassword in the request
        newPassword,
      });

      console.log(response.data);
      toast.success('Profile updated successfully', { theme: 'dark' });
    } catch (error) {
      toast.error('Failed to update profile', { theme: 'dark' });
    }
  };

  return (
    <div className="min-h-screen w-full bg-mdark">
      <Header></Header>
      <div className="mx-auto max-w-md pt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthInput
            label="Name"
            name="name"
            type="text"
            isReadOnly={true}
            placeholder="Your name"
            registerOptions={register('name', {
              required: 'Name is required',
            })}
            errors={errors}
          />
          <AuthInput
            label="Email"
            name="email"
            type="email"
            isReadOnly={true}
            placeholder="Your email"
            registerOptions={register('email', {
              required: 'Email is required',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Invalid email format',
              },
            })}
            errors={errors}
          />
          <AuthInput
            label="Old Password"
            name="oldPassword"
            type="password"
            placeholder="Your current password"
            registerOptions={register('oldPassword', {
              required: 'Current password is required',
            })}
            errors={errors}
          />
          <AuthInput
            label="New Password"
            name="newPassword"
            type="password"
            placeholder="New password"
            registerOptions={register('newPassword', {
              required: 'New password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters long',
              },
            })}
            errors={errors}
          />
          <AuthInput
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Confirm new password"
            registerOptions={register('confirmPassword', {
              required: 'Please confirm your new password',
            })}
            errors={errors}
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            Update Info
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
