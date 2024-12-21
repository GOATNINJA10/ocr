"use client";

import TextCard from "@/components/Cards/TextCard";
import converter from "@/lib/converter";
import React, { useRef, useState } from "react";
import { IoImage } from "react-icons/io5";

export default function Home() {
  const imgInputRef = useRef<HTMLInputElement | null>(null);
  const [processing, setProcessing] = useState<boolean>(false);
  const [texts, setTexts] = useState<Array<string>>([]);



  const openBrowse = () => {
    imgInputRef.current?.click();
  };

  const convert = async (url: string) => {
    if (url) {
      setProcessing(true);
      try {
        const txt = await converter(url);
        if (txt) {
          setTexts((prevTexts) => [...prevTexts, txt]); // Properly update state
        }
      } catch (error) {
        console.error("Error during conversion:", error);
      } finally {
        setProcessing(false);
      }
    }
  };

  return (
    <div>
      <div className="text-white">
        <h2 className="px-5 pt-6 text-center md:text-5xl text-3xl font-[700]">
          Built with{" "}
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 inline-block text-transparent bg-clip-text">
            Tesseract Js
          </span>
        </h2>
        <input
          type="file"
          ref={imgInputRef}
          hidden
          required
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              const url: string = URL.createObjectURL(e.target.files?.[0]!);
              convert(url);
          }}
        />
        <div
          className="w-full md:p-20 p-5 flex items-center justify-center"
          style={{ paddingTop: "40px" }}
        >
          <div
            onClick={openBrowse}
            onDrop={(e: any)=>{
              e.preventDefault();
              const url = URL.createObjectURL(e.dataTransfer.files?.[0]!);
              // console.log(url)
              convert(url);
            }}
            onDragOver={(e: any)=> {
              e.preventDefault();
            }}
            className="w-full p-5 bg-[#2c2c2c] min-h-[50vh] rounded-xl flex items-center justify-center cursor-pointer"
          >
            <div className="flex items-center justify-center flex-col">
              <p className="text-center text-2xl font-[700] text-[#707070]">
                {processing
                  ? "Processing Image ..."
                  : "Browse or Drop your Image here"}
              </p>
              <span className="text-[100px] text-[#707070]">
                <IoImage className={processing ? "animate-pulse" : ""} />
              </span>
            </div>
          </div>
        </div>

        <div className="my-10 md:px-20 px-5 space-y-10">
          {
            texts?.map((t,i) => {
              return <TextCard key={i} i={i} t={t}/>
            })
          }
        </div>
      </div>
    </div>
  );
}
