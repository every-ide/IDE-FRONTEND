import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineLike,
} from 'react-icons/ai';
import { MdLocationOn, MdPeople } from 'react-icons/md';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '../button';

interface CardProps {
  banner: string;
  title: string;
  dateRange: string;
  location: string;
  totalParticipants: number;
  currentlyJoined: number;
  likes: number;
}

const CardContainer: React.FC<CardProps> = ({
  banner,
  title,
  dateRange,
  location,
  totalParticipants,
  currentlyJoined,
  likes,
}) => {
  return (
    <Card variant="container">
      <img
        src={banner}
        alt="Event Banner"
        className="h-48 w-full object-cover p-4"
      />
      <CardHeader className="pb-4">
        <CardTitle className="text-xl">{title}</CardTitle>
      </CardHeader>
      <CardContent className="text-sm">
        <div className="flex items-center pt-4 text-sm text-white dark:text-white">
          <AiOutlineCalendar />
          <span className="ml-1">{dateRange}</span>
        </div>
        <div className="flex items-center pt-4 text-sm text-white dark:text-white">
          <MdLocationOn />
          <span className="ml-1">{location}</span>
        </div>
      </CardContent>
      <CardFooter>
        <Button className="w-full">참가하기</Button>
      </CardFooter>
    </Card>
  );
};

export default CardContainer;
