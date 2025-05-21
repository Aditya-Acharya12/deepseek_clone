import Image from 'next/image'
import { assets } from '@/assets/assets'
import React from 'react'
import { useState } from 'react'

const PromptBox = ({isLoading,setIsLoading}) => {

    const [prompt, setPrompt] = useState('');



  return (
    <div className="w-full flex justify-center px-4">
  <form
    className={`w-full ${false ? 'max-w-3xl' : 'max-w-2xl'} bg-[#404045] p-4 rounded-3xl mt-4 transition-all`}
  >
    <textarea
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