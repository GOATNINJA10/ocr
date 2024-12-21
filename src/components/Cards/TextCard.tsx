import React, { useState } from 'react'




const TextCard = ({t, i}:{t:string, i:number}) => {
    const [serverTime, setServerTime] = useState<string>("");
    React.useEffect(() => {
    const utcDate = new Date();
    setServerTime(new Date(utcDate.getTime() + 5.5 * 60 * 60 * 1000).toUTCString());
    }, []);

    const copyToClipBoard = (txt: string) =>{
        navigator.clipboard.writeText(txt);
    }

  return (
    <div>
    <div className="flex w-full items-center justify-between mb-5">
      <p className="text-lg font-[600]">{`(${i + 1}) `}{serverTime}</p>
      <button onClick={()=>{
        copyToClipBoard(t);
      }} className="bg-white text-black text-sm md:text-base rounded-md px-5 py-2 transition-all hover:bg-[#b1b1b1]">
        Copy
      </button>
    </div>
    <textarea
      className="w-full p-5 min-h-[50vh] bg-[#2c2c2c] rounded-xl outline-none"
      defaultValue={t}
    ></textarea>
  </div>
  )
}

export default TextCard