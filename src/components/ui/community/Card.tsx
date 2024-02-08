import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineLike,
} from 'react-icons/ai';
import { MdLocationOn, MdPeople } from 'react-icons/md';

interface CardProps {
  banner: string;
  title: string;
  dateRange: string;
  location: string;
  totalParticipants: number;
  currentlyJoined: number;
  likes: number;
}

const Card: React.FC<CardProps> = ({
  banner,
  title,
  dateRange,
  location,
  totalParticipants,
  currentlyJoined,
  likes,
}) => {
  return (
    <div className="w-full max-w-sm overflow-hidden border-2 pb-7 shadow-md dark:bg-mdark">
      <img
        src={banner}
        alt="Event Banner"
        className="h-48 w-full object-cover"
      />
      <div className="p-4 pt-10">
        <h3 className="mb-2 text-lg font-bold text-white dark:text-white">
          {title}
        </h3>
        <div className="flex items-center pt-4 text-sm text-white dark:text-white">
          <AiOutlineCalendar />
          <span className="ml-1">{dateRange}</span>
        </div>
        <div className="flex items-center pt-4 text-sm text-white dark:text-white">
          <MdLocationOn />
          <span className="ml-1">{location}</span>
        </div>
        <div className="flex items-center justify-between pt-4 text-sm text-white dark:text-white">
          <div className="flex items-center pt-4">
            <MdPeople />
            <span className="ml-1">{totalParticipants}명</span>
          </div>
          <div className="flex items-center pt-4">
            <AiOutlineUser />
            <span className="ml-1">{currentlyJoined}명 참여</span>
          </div>
          <div className="flex items-center pt-4">
            <AiOutlineLike />
            <span className="ml-1">{likes}</span>
          </div>
        </div>
        <button className="mt-4 w-full rounded bg-blue-400 py-2 text-white hover:bg-purple-700 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-900">
          참가하기
        </button>
      </div>
    </div>
  );
};

export default Card;
