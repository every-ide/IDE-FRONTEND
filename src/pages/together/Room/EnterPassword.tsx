import { Button } from '@/src/components/ui/button';
import { Input } from '@/src/components/ui/input';
import React, { FormEvent } from 'react';

interface IEnterPasswordProps {
  enterPassword: (e: FormEvent) => void;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}

const EnterPassword = ({
  enterPassword,
  password,
  setPassword,
}: IEnterPasswordProps) => {
  return (
    <div className="flex h-[calc(100vh-87px)] w-full flex-col items-center justify-center gap-8">
      <div className="text-center">
        <p className="text-4xl">🔐</p>
        <p className="text-2xl font-black">ENTER YOUR PASSWORD</p>
        <p>비밀번호를 입력해주세요.</p>
      </div>
      <form onSubmit={enterPassword}>
        <div className="flex flex-row gap-4">
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            type="password"
            placeholder="비밀번호를 입력하세요"
            className="text-black"
          />
          <Button type="submit">입장</Button>
        </div>
      </form>
    </div>
  );
};

export default EnterPassword;
