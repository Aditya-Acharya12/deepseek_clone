import React, { useRef, useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/assets/assets';
import toast from 'react-hot-toast';
import axios from 'axios';
import { useAppContext } from '@/context/AppContext';

const ChatLabel = ({ chat, openMenu, setOpenMenu }) => {
  const { fetchUsersChats, setSelectedChat } = useAppContext();
  const { _id, name } = chat;
  const menuRef = useRef(null);
  const triggerRef = useRef(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  const selectChat = () => {
    setSelectedChat(chat);
  };

  const renameHandler = async () => {
    try {
      const newName = prompt('Enter new name');
      if (!newName) return;
      const { data } = await axios.post('/api/chat/rename', { chatId: _id, name: newName });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const deleteHandler = async () => {
    try {
      const confirmDelete = window.confirm('Are you sure you want to delete this chat?');
      if (!confirmDelete) return;
      const { data } = await axios.post('/api/chat/delete', { chatId: _id });
      if (data.success) {
        fetchUsersChats();
        setOpenMenu({ id: 0, open: false });
        toast.success(data.message);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const toggleMenu = (e) => {
    e.stopPropagation();
    const rect = triggerRef.current?.getBoundingClientRect();
    if (rect) {
      setPosition({ top: rect.top + 30, left: rect.right + 10 });
    }
    setOpenMenu(prev => ({
      id: _id,
      open: !(prev.open && prev.id === _id),
    }));
  };

  const closeMenu = () => {
    setOpenMenu({ id: 0, open: false });
  };

  const isOpen = openMenu.open && openMenu.id === _id;

  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (isOpen && menuRef.current && !menuRef.current.contains(e.target)) {
        closeMenu();
      }
    };
    document.addEventListener('mousedown', handleOutsideClick);
    return () => document.removeEventListener('mousedown', handleOutsideClick);
  }, [isOpen]);

  return (
    <>
      <div
        onClick={selectChat}
        className="flex items-center justify-between p-2 text-white/80 hover:bg-white/10 rounded-lg text-sm cursor-pointer relative z-10"
      >
        <p className="truncate">{name}</p>

        <div
          ref={triggerRef}
          onClick={toggleMenu}
          className="relative flex items-center justify-center h-6 w-6 hover:bg-black/80 rounded-lg z-20"
        >
          <Image src={assets.three_dots} alt="three dots" className="w-4" />
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div>
          {/* Backdrop on mobile */}
          <div
            className="fixed inset-0 bg-black/40 z-30 sm:hidden"
            onClick={closeMenu}
          />

          {/* Menu */}
          <div
            ref={menuRef}
            className={`
              z-40 bg-gray-700 rounded-xl p-2 w-40
              absolute sm:fixed transition-all
              ${isOpen
                ? 'block'
                : 'hidden'}
              sm:top-[${position.top}px] sm:left-[${position.left}px]
              max-sm:top-1/2 max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:-translate-y-1/2 max-sm:w-[90vw]
            `}
            style={window.innerWidth >= 640 ? { top: position.top, left: position.left } : {}}
          >
            <div
              onClick={() => {
                renameHandler();
                closeMenu();
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg"
            >
              <Image src={assets.pencil_icon} alt="edit" className="w-4" />
              <p>Rename</p>
            </div>
            <div
              onClick={() => {
                deleteHandler();
                closeMenu();
              }}
              className="flex items-center gap-3 px-3 py-2 hover:bg-white/10 rounded-lg"
            >
              <Image src={assets.delete_icon} alt="delete" className="w-4" />
              <p>Delete</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatLabel;
