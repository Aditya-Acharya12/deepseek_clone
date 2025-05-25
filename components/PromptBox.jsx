import Image from 'next/image'
import { assets } from '@/assets/assets'
import React from 'react'
import { useState } from 'react'
import { useAppContext } from '@/context/AppContext'
import toast from 'react-hot-toast'
import axios from 'axios'
import { set } from 'mongoose'

const PromptBox = ({isLoading,setIsLoading}) => {

    const [prompt, setPrompt] = useState('');
    const {user,chats,setChats,selectedChat, setSelectedChat} = useAppContext();

    const handleKeyDown = (e) => {
        if(e.key === 'Enter' && !e.shiftKey){
            e.preventDefault();
            sendPrompt(e);
        }
    }

    const sendPrompt = async (e) => {
        const promptCopy = prompt;

        try{
            e.preventDefault();
            if(!user) return toast.error('Login to send a message');
            if(isLoading) return toast.error('Wait for the previous prompt response');

            setIsLoading(true);
            setPrompt('');

            const userPrompt = {
                role: "user",
                content: prompt,
                timestamp: Date.now(),
            }

            // saving user prompt in the chat array 
            console.log("User Prompt:", userPrompt);
    console.log("Sending to API with chatId:", selectedChat._id);

            setChats((prevChats)=> prevChats.map((chat)=> chat.id === selectedChat._id ? {
                ...chat,
                messages: [...chat.messages, userPrompt]
            } : chat))

            // saving user prompt in the selected chat

            setSelectedChat((prev)=> ({
                ...prev,
                messages: [...prev.messages, userPrompt]
            }))

            const {data} = await axios.post('/api/chat/ai', {
                chatId: selectedChat._id,
                prompt
            })

            if(data.success){
                setChats((prevChats)=> prevChats.map((chat)=> chat.id === selectedChat._id ? {
                    ...chat,
                    messages: [...chat.messages, data.data]} : chat))

                    const message = data.data.content;
                    const messageTokens = message.split('');
                    let assistantMessage = {
                        role: "assistant",
                        content: "",
                        timestamp: Date.now(),
                    }

                    setSelectedChat((prev)=> ({
                        ...prev,
                        messages: [...prev.messages, assistantMessage],
                    }))

                    for(let i=0; i < messageTokens.length; i++)
                    {
                        setTimeout(() => {
                            assistantMessage.content = messageTokens.slice(0,i+1).join('');
                            setSelectedChat((prev)=> {
                                const updatedMessages = [
                                    ...prev.messages.slice(0,-1),
                                    assistantMessage
                                ]
                                return {...prev, messages:updatedMessages}
                            })
                        },i*100)
                    }
            }else{
                toast.error(data.message || "something went wrong");
                setPrompt(promptCopy);
            }

        }catch(error){
            toast.error(error.message || "something went wrong");
            setPrompt(promptCopy);
        } finally {
            setIsLoading(false);
        }
    }




  return (
    <div className="w-full flex justify-center px-4">
  <form onSubmit={sendPrompt}
    className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
  >
    <textarea
    onKeyDown = {handleKeyDown}
      className="outline-none w-full resize-none overflow-hidden break-words bg-transparent text-white placeholder:text-white/60 text-sm"
      rows={2}
      placeholder="Message DeepSeek"
      required
      onChange={(e) => setPrompt(e.target.value)}
      value={prompt}
    />
    <div className="flex items-center justify-between text-sm mt-3">
      <div className="flex items-center gap-2">
        <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
          <Image src={assets.deepthink_icon} alt="deepthink" className="h-5 w-5" />
          DeepThink (R1)
        </p>
        <p className="flex items-center gap-2 text-xs border border-gray-300/40 px-2 py-1 rounded-full cursor-pointer hover:bg-gray-500/20 transition">
          <Image src={assets.search_icon} alt="search" className="h-5 w-5" />
          DeepSearch
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Image src={assets.pin_icon} alt="pin" className="w-4 cursor-pointer" />
        <button
          className={`${
            prompt ? 'bg-primary' : 'bg-[#71717a]'
          } rounded-full p-2 cursor-pointer transition`}
        >
          <Image
            src={prompt ? assets.arrow_icon : assets.arrow_icon_dull}
            alt="send"
            className="w-3.5 aspect-square"
          />
        </button>
      </div>
    </div>
  </form>
</div>
  )
}

export default PromptBox