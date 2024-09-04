import React from "react";

const Support = () => {
  return (
    <div className="flex flex-col  ">
      <div className="flex  gap-9  border-b   ">
        <h2 className="text-3xl m-5  ">Help</h2>
        <button className="text-2xl gap-12 m-5 text-black text-bold bg-white hover:bg-slate-400 rounded-md ">
          Riders
        </button>
      </div>
      <p className='divide-x divide-gray-300/100'></p>
      <div>
        <p className="underline underline-offset-4 text-xl m-5">Home</p>
      </div>

      <div>
        <h2 className="text-5xl font-semibold m-5 mt-30">Support Messages</h2>
      </div>

      <p className="text-base font-semibold m-5 mt-7">No messages found</p>

      <h2 className="text-4xl font-semibold m-5 mt-5">Archive</h2>

      <p className="text-base font-semibold m-5 mt-7">No messages found</p>
    </div>
  );
};

export default Support