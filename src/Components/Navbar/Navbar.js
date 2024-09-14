import React from "react";
import Input from "../Common/Input";

export default function Navbar() {
  const menus = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
  const menusList = menus.map((menu, idx) => {
    return <li key={idx} className="w-[150px] px-4 py-5 text-center my-auto hover:text-white hover:bg-periwinkleBlue rounded-lg">{menu}</li>;
  });
  return (
    <nav className="flex w-full h-24 justify-between mt-10 mb-16">
      <div className="w-[33.33%] h-full flex-initial">
        <Input className='w-full h-full pl-14 pr-3 py-4 text-mirage border border-lavenderMist rounded-md focus:outline-none focus:border-periwinkleBlue focus:ring-periwinkleBlue placeholder:opacity-1 bg-searchIcon bg-no-repeat bg-[center_left_1rem] bg-[length:32px_32px]' placeholder={'Search users'} type={'search'}/>
      </div>
      <ul className="flex justify-between items-center w-[600px] flex-initial font-poppins text-mirage">{menusList}</ul>
    </nav>
  );
}


<input class="   focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"></input>