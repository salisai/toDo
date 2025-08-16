import React from "react";

const Background = () => {
  return (
    <>
      <div className="w-full h-screen fixed z-[2]">
        <div className="absolute top-[5%] w-full py-10 flex justify-center text-zinc-600 text-xl">
        </div>
        <h1 className="absolute top-1/2 left-1/2 -translate-x-[50%] -translate-y-[50%] text-[10vw] leading-none tracking-tighter font-semibold text-zinc-900">
          todos
        </h1>
      </div>
    </>
  );
};

export default Background;
