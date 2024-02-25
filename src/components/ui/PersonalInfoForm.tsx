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

  interface IFormInput {
    name: string;
    email: string;
    oldPassword: string;
    newPassword: string;
    confirmPassword: string;
  }

  const onSubmit = async (data: IFormInput) => {
    const { email, oldPassword, newPassword, confirmPassword } = data;
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
      toast.success('Profile updated successfully');
    } catch (error) {
      toast.error('Failed to update profile');
    }
  };

  return (
    <div className="min-h-screen w-full bg-mdark">
      <Header></Header>
      <div className="mx-auto max-w-md pt-5">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <AuthInput
            label="이름"
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
            label="이메일"
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
            label="현재 비밀번호"
            name="oldPassword"
            type="password"
            placeholder="현재 비밀번호를 입력해 주세요."
            registerOptions={register('oldPassword', {
              required: '현재 비밀번호를 입력해 주세요.',
            })}
            errors={errors}
          />
          <AuthInput
            label="변경할 비밀번호"
            name="newPassword"
            type="password"
            placeholder="변경할 비밀번호를 입력해 주세요."
            registerOptions={register('newPassword', {
              required: '현재 비밀번호를 입력해 주세요.',
              minLength: {
                value: 8,
                message: '비밀번호는 최소 8자이상이어야 합니다.',
              },
            })}
            errors={errors}
          />
          <AuthInput
            label="변경할 비밀번호확인"
            name="confirmPassword"
            type="password"
            placeholder="변경할 비밀번호를 한번 더 입력해 주세요."
            registerOptions={register('confirmPassword', {
              required: '비밀번호가 일치하지 않습니다.',
            })}
            errors={errors}
          />
          <button
            type="submit"
            className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            비밀번호 변경하기
          </button>
        </form>
      </div>
    </div>
  );
};

export default PersonalInfoForm;
