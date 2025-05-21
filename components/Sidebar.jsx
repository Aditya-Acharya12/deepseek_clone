import Image from 'next/image';
import { assets } from '@/assets/assets';
import React from 'react';

const Sidebar = ({ expand, setExpand }) => {
  return (
    <div
      className={`flex flex-col justify-between bg-[#212327] pt-7 transition-all duration-300 z-50 max-md:absolute max-md:h-screen 
      ${expand ? 'p-4 md:w-64 w-full' : 'md:w-20 w-0 max-md:overflow-hidden'}`}
    >
      <div>
        {/* LOGO + TOGGLE */}
        <div className={`flex ${expand ? 'flex-row gap-10' : 'flex-col items-center gap-8'}`}>
          {/* Logo wrapper with fixed height + transition */}
          <div className="transition-all duration-300 w-36 h-10 relative">
            <Image
              src={expand ? assets.logo_text : assets.logo_icon}
              alt="logo"
              fill
              className="object-contain"
              priority
            />
          </div>

          {/* Sidebar toggle button */}
          <div
            onClick={() => setExpand(!expand)}
            className="group relative flex items-center justify-center hover:bg-gray-500/20 transition-all duration-300 h-9 w-9 aspect-square rounded-lg cursor-pointer"
          >
            {/* Mobile menu icon */}
            <Image src={assets.menu_icon} alt="menu" className="md:hidden" />

            {/* Desktop expand/collapse icon */}
            <Image
              src={expand ? assets.sidebar_close_icon : assets.sidebar_icon}
              alt="toggle"
              className="hidden md:block w-7"
            />

            {/* Tooltip */}
              <div
                className={`
                  absolute ${expand ? 'top-full mt-2' : 'bottom-full mb-3'}
                  ${expand ? 'left-1/2 -translate-x-1/2' : 'left-1 translate-x-0'}
                  max-w-[150px] bg-black text-white text-sm px-3 py-1.5 rounded-lg shadow-lg 
                  opacity-0 group-hover:opacity-100 pointer-events-none 
                  transition-all duration-300 whitespace-nowrap z-10
                `}
              >
                {expand ? 'Close sidebar' : 'Open sidebar'}

                {/* Tooltip Arrow */}
                <div
                  className={`
                    absolute w-2 h-2 bg-black rotate-45
                    ${expand ? 'left-1/2 -translate-x-1/2 -top-1' : 'left-4 -bottom-1'}
                  `}
                />
              </div>

          </div>

        </div>

        <button
            className={`mt-8 flex items-center justify-center cursor-pointer relative transition-all duration-300
              ${
                expand
                  ? 'bg-primary hover:opacity-90 rounded-2xl gap-2 p-2.5 w-max'
                  : 'group h-9 mx-auto hover:bg-gray-500/30 rounded-lg'
              }`}
          >
            {/* Icon */}
            <Image
              className={expand ? 'w-6' : 'w-7'}
              src={expand ? assets.chat_icon : assets.chat_icon_dull}
              alt="chat"
            />

            {/* Tooltip (above the button) */}
            {!expand && (
              <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-max opacity-0 group-hover:opacity-100 bg-black text-white text-sm px-3 py-2 rounded-lg shadow-lg pointer-events-none transition-all duration-200 whitespace-nowrap z-10">
                New chat
                {/* Tooltip arrow */}
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-black rotate-45" />
              </div>
            )}

            {/* Label when expanded */}
            {expand && <p className="text-white font-medium">New chat</p>}
          </button>

        <div className={`mt-8 text-white/25 text-sm ${expand?"block":"hidden"}`}>
          <p className='my-1'>Recents</p>
          {/* chat label */}
        </div>

      </div>

      <div>
        <div
          className={`flex items-center cursor-pointer group relative ${
            expand
              ? 'gap-2 text-white/80 text-sm p-2.5 border border-primary rounded-lg hover:bg-white/10'
              : 'h-10 w-10 mx-auto hover:bg-gray-500/30 rounded-lg'
          }`}
        >
          <Image
            className={expand ? 'w-5' : 'w-6 mx-auto'}
            src={expand ? assets.phone_icon : assets.phone_icon_dull}
            alt=""
          />

          {/* Tooltip */}
          <div
            className={`absolute -top-60 pb-8 ${
              !expand ? '-right-40' : 'left-1/2 -translate-x-1/2'
            } opacity-0 group-hover:opacity-100 hidden group-hover:block transition-all duration-300 z-10`}
          >
            <div className="relative w-48 bg-black text-white text-sm px-4 py-3 rounded-lg shadow-lg text-center space-y-2">
              <Image src={assets.qrcode} alt="QR Code" className="w-36 mx-auto" />
              <p className="text-xs">Scan to get DeepSeek App</p>

              {/* Tooltip arrow (unchanged position) */}
              <div
                className={`w-3 h-3 absolute bg-black rotate-45 ${
                  expand ? 'right-1/2' : 'left-4'
                } -bottom-1.5`}
              />
            </div>
          </div>

          {expand && (
            <>
              <span>Get App</span>
              <Image alt="" src={assets.new_icon} />
            </>
          )}
        </div>

          <div className={`flex items-center ${expand ? 'hover:bg-white/10 rounded-lg': 'justify-center w-full'} gap-3 text-white/60 text-sm p-2 mt-2 cursor-pointer`}> 
            <Image src = {assets.profile_icon} alt='' className='w-7'/>
            {expand && <span>My Profile</span>}
          </div>

      </div>
    </div>
  );
};

export default Sidebar;
