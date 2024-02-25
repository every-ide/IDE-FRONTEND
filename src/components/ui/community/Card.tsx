import React from 'react';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FaLock, FaLockOpen } from 'react-icons/fa6';
import { useNavigate } from 'react-router-dom';
import { Button } from '../button';

interface CardProps {
  roomId: string;
  name: string;
  type: string;
  isLocked: boolean;
  usersCnt: number;
  maxPeople: number;
  ownerName: string;
  description: string;
  isJoined: boolean;
}

const CardContainer: React.FC<CardProps> = ({
  roomId,
  name,
  type,
  isLocked,
  usersCnt,
  maxPeople,
  ownerName,
  // description,
  isJoined,
}) => {
  const navigate = useNavigate();
  console.log('isJoined', isJoined);
  return (
    <Card variant="container">
      <CardHeader>
        <div className="mb-2 flex h-10 items-center justify-between">
          {type === 'QUESTION' ? (
            <div className="rounded-lg border border-fuchsia-400 bg-fuchsia-400/20 px-2 py-0.5 text-[10px] text-fuchsia-400">
              질문 있어요
            </div>
          ) : (
            <div className="rounded-lg border border-indigo-400 bg-indigo-400/20 px-2 py-0.5 text-[10px] text-indigo-400">
              질문 받아요
            </div>
          )}
          <div className="flex items-center gap-2">
            {isLocked ? (
              <FaLock className="size-5" />
            ) : (
              <FaLockOpen className="size-5" />
            )}
          </div>
        </div>

        <CardTitle className="ml-1 text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col gap-2 text-xs text-gray-400">
          <div>방장 - {ownerName}</div>
          <div>
            가입인원 / 총인원 - {usersCnt || 1} / {maxPeople}
          </div>
        </div>
      </CardContent>
      <CardFooter>
        {isJoined ? (
          <Button
            className="w-full"
            onClick={() => navigate(`/together/${roomId}?isLocked=${isLocked}`)}
          >
            입장하기
          </Button>
        ) : (
          <Button
            className="w-full"
            onClick={() => navigate(`/together/${roomId}?isLocked=${isLocked}`)}
            disabled={usersCnt === maxPeople}
          >
            {usersCnt === maxPeople ? '정원초과' : '가입하기'}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default CardContainer;
