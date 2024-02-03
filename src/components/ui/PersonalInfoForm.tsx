import React, { useState } from 'react';
import AuthInput from '@components/auth/AuthInput.tsx';
import { axiosPublic } from '@src/api/axios';

interface PersonalInfo {
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
}

const staticInfo = {
  name: 'John Doe',
  phone: '010-1234-5678',
};

const PersonalInfoForm: React.FC = () => {
  const [personalInfo, setPersonalInfo] = useState<PersonalInfo>({
    email: '',
    password: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<any>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });
    // Clear errors for a field when the user starts typing
    if (errors[e.target.name]) {
      const newErrors = { ...errors };
      delete newErrors[e.target.name];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: any = {};
    // 이메일 유효성 검증을 위한 정규 표현식
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // 간단한 미국 전화번호 패턴 (필요에 따라 조정)
    // const phonePattern = /^(\+82)?\s?0?(1[0-9]{1})-?([0-9]{3,4})-?([0-9]{4})$/;

    // 빈 필드 검사 및 특정 검증 추가
    // if (!personalInfo.name.trim()) {
    //   newErrors.name = { message: '이름을 입력해주세요.' };
    // }
    if (!personalInfo.email) {
      newErrors.email = { message: '이메일을 입력해주세요.' };
    } else if (!personalInfo.email.match(emailPattern)) {
      newErrors.email = { message: '유효한 이메일 주소를 입력해주세요.' };
    }
    // if (!personalInfo.phone) {
    //   newErrors.phone = { message: '전화번호를 입력해주세요.' };
    // } else if (!personalInfo.phone.match(phonePattern)) {
    //   newErrors.phone = { message: '유효한 전화번호를 입력해주세요.' };
    // }
    if (!personalInfo.password) {
      newErrors.password = { message: '비밀번호를 입력해주세요.' };
    }
    if (!personalInfo.newPassword) {
      newErrors.newPassword = { message: '새 비밀번호를 입력해주세요.' };
    } else if (personalInfo.newPassword !== personalInfo.confirmPassword) {
      newErrors.confirmPassword = { message: '비밀번호가 일치하지 않습니다.' };
    } else if (personalInfo.newPassword.length < 8) {
      newErrors.newPassword = {
        message: '새 비밀번호는 최소 8자 이상이어야 합니다.',
      };
    }
    // 새 비밀번호가 제공되었을 때만 confirmPassword가 비어 있는지 확인 (선택적)
    if (personalInfo.newPassword && !personalInfo.confirmPassword) {
      newErrors.confirmPassword = { message: '새 비밀번호를 확인해주세요.' };
    }

    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
    } else {
      try {
        console.log('Form submitted:', personalInfo);
        // axiosPublic 인스턴스를 사용하여 서버에 데이터 전송
        const response = await axiosPublic.patch('/user/updateprofile', {
          email: personalInfo.email,
          password: personalInfo.password, // 실제 요청에 따라 필드명 변경 필요
          newPassword: personalInfo.newPassword,
        });
        console.log(response.data); // 성공 응답 처리
        // 추가적인 성공 처리 로직 (예: 사용자에게 알림, 폼 초기화 등)
      } catch (error) {
        console.error(error);
        // 에러 처리 로직 (예: 사용자에게 에러 메시지 표시)
        if (error.response) {
          // 서버 응답에 따른 오류 처리
          setErrors({ form: `Error: ${error.response.data.message}` });
        } else {
          // 요청이 만들어지지 않은 경우의 오류 처리
          setErrors({ form: 'Network error. Please try again.' });
        }
      }
    }
  };

  return (
    <div className="mx-auto max-w-md">
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-white">Name</label>
          <div className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700">
            {staticInfo.name}
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">Phone</label>
          <div className="mt-1 block w-full rounded-md bg-gray-100 px-3 py-2 text-gray-700">
            {staticInfo.phone}
          </div>
        </div>
        {Object.keys(personalInfo).map((key) => (
          <AuthInput
            key={key}
            label={key.charAt(0).toUpperCase() + key.slice(1)} // Capitalize the label
            name={key}
            type={
              key.includes('assword')
                ? 'password'
                : key === 'email'
                  ? 'email'
                  : 'text'
            }
            placeholder={`Your ${key.charAt(0).toUpperCase() + key.slice(1)}`}
            registerOptions={{
              onChange: handleChange,
              name: key,
              value: personalInfo[key as keyof PersonalInfo],
            }}
            errors={errors}
          />
        ))}
        <button
          type="submit"
          className="rounded-lg bg-indigo-600 px-4 py-2 font-semibold text-white shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default PersonalInfoForm;
