import React from "react";

function BoardCard() {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-200 rounded-lg  p-5">
      <div>
        <div className="w-full h-32 rounded-md overflow-hidden">
          <img
            src="https://pbs.twimg.com/media/FDRw7kCagAAfb0b?format=jpg&name=900x900"
            className="img-full"
          />
        </div>
        <h2 className="mt-3 font-semibold">Simple Project Board</h2>
      </div>
      <div className="flex space-x-3 mt-8 items-center">
        <div className="img-container w-10 h-10 cursor-pointer">
          <img
            src="https://lastfm.freetls.fastly.net/i/u/770x0/d94e7f5b6162e826bf8f451b383a78f1.jpg"
            alt=""
            className="img-full"
          />
        </div>
        <div className="text-gray-400">5+ Others</div>
      </div>
    </div>
  );
}

export default BoardCard;
