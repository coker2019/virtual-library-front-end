import React from "react";

const BookCard = () => {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-[#BCCF99] dark:border-gray-700 cursor-pointer relative">
      <img
        className="rounded-t-lg"
        src="https://res.cloudinary.com/tamstech-computer-repair-center/image/upload/v1646312651/istockphoto-1144287280-612x612_k8usic.jpg"
        alt=""
      />
      <div className="p-3">
        <h5 className=" text-lg font-bold tracking-tight text-gray-900 white:text-dark">
          Noteworthy technology
        </h5>
        <h5 className="text-gray-800">John Doe</h5>
        <p className="text-[12px] text-gray-700 dark:text-gray-500">
          Here are the biggest enterprise technology acquisitions of 2021 so
          far, in reverse chronological order.
        </p>
      </div>

      <div className="flex justify-between p-3">
        <button className="btn">Reserve</button>
        <button className="btn">Borrow</button>
      </div>

      <div className="absolute top-0 right-3">
        <span className="bg-blue text-[10px] text-white p-1  rounded-sm">
          Recommended
        </span>
      </div>
    </div>
  );
};

export default BookCard;
