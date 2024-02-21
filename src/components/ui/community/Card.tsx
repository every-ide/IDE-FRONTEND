import React from 'react';
import { GiTeacher } from 'react-icons/gi';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { TbUserQuestion } from 'react-icons/tb';
import { FaLock, FaLockOpen } from 'react-icons/fa6';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '../button';

interface CardProps {
  roomId: string;
  name: string;
  type: string;
  isLocked: boolean;
  usersCount: number;
  maxPeople: number;
  ownerName: string;
}

const CardContainer: React.FC<CardProps> = ({
  roomId,
  name,
  type,
  isLocked,
  usersCount,
  maxPeople,
  ownerName,
}) => {
  const navigate = useNavigate();
  return (
    <Card variant="container">
      {/* <img
        src="src/assets/images/placeholder.jpg"
        alt="Event Banner"
        className="h-auto w-full object-cover p-4"
      /> */}
      <CardHeader className="pb-4">
        <CardTitle className="ml-1 text-xl">{name}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center justify-between text-sm text-white dark:text-white ">
          {type === 'QUESTION' ? (
            <div className="flex flex-col">
              <TbUserQuestion className="mr-2 size-11" />
              <span className="size-5 pt-3">QUESTION</span>
            </div>
          ) : (
            <div className="flex flex-col">
              <GiTeacher className="mr-2 size-11" />
              <span className="size-5 pt-3">ANSWER</span>
            </div>
          )}
          <div className="flex flex-col">
            {isLocked ? (
              <FaLock className="mr-2 size-7" />
            ) : (
              <FaLockOpen className="mr-2 size-7" />
            )}
          </div>
        </div>
        <div className="flex items-center justify-between pt-4 text-sm text-white dark:text-white">
          <span>Owner: {ownerName}</span>
          <span className="">
            {usersCount || 1} / {maxPeople}
          </span>
        </div>
      </CardContent>
      <CardFooter>
        <Button
          className="w-full"
          onClick={() => navigate(`/together/${roomId}`)}
        >
          가입하기
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CardContainer;
