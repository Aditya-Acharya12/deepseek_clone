import React from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';

const ChatLabel = ({ openMenu, setOpenMenu }) => {
  const toggleMenu = () => {
    setOpenMenu((prev) => ({
      open: !prev.open,
    }));
  };

  return (
    <div className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm cursor-pointer">
      {/* Chat name */}
      <p className="max-w-[85%] truncate">Chat Name here</p>

      {/* 3-dot menu button */}
      <div
        onClick={toggleMenu}
        className="relative flex items-center justify-center h-6 w-6 aspect-square hover:bg-black/80 rounded-lg"
      >
        <Image
          src={assets.three_dots}
          alt="three dots"
          className="w-4"
        />

        {/* Dropdown menu */}
        {openMenu.open && (
          <div className="absolute -right-36 top-6 bg-gray-700 rounded-xl w-max p-2 z-10">
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg">
              <Image src={assets.pencil_icon} alt="edit" className="w-4" />
              <p>Rename</p>
            </div>
            <div className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg">
              <Image src={assets.delete_icon} alt="delete" className="w-4" />
              <p>Delete</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatLabel;