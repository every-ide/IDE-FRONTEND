import React from 'react';
import {
  AiOutlineCalendar,
  AiOutlineUser,
  AiOutlineLike,
} from 'react-icons/ai';
import { MdLocationOn, MdPeople } from 'react-icons/md';

interface CardProps {
  title: string;
  dateRange: string;
  location: string;
  totalParticipants: number;
  currentlyJoined: number;
  likes: number;
}

const Card: React.FC<CardProps> = ({
  title,
  dateRange,
  location,
  totalParticipants,
  currentlyJoined,
  likes,
}) => {
  return (
    <div className="w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-md">
      <img
        src="/path-to-your-image.png"
        alt="Event Banner"
        className="w-full"
      />
      <div className="p-4">
        <h3 className="mb-2 text-lg font-bold">{title}</h3>
        <div className="mb-2 flex items-center text-sm">
          <AiOutlineCalendar className="text-gray-500" />
          <span className="ml-1">{dateRange}</span>
        </div>
        <div className="mb-4 flex items-center text-sm">
          <MdLocationOn className="text-gray-500" />
          <span className="ml-1">{location}</span>
        </div>
        <div className="mb-2 flex items-center justify-between text-sm">
          <div className="flex items-center">
            <MdPeople className="text-gray-500" />
            <span className="ml-1">{totalParticipants}명</span>
          </div>
          <div className="flex items-center">
            <AiOutlineUser className="text-gray-500" />
            <span className="ml-1">{currentlyJoined}명 참여</span>
          </div>
          <div className="flex items-center">
            <AiOutlineLike className="text-gray-500" />
            <span className="ml-1">{likes}</span>
          </div>
        </div>
        <button className="w-full rounded bg-purple-600 py-2 text-white">
          참가하기
        </button>
      </div>
    </div>
  );
};

export default Card;
