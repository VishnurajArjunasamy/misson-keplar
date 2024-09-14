import React from "react";
import Input from "../Common/Input";

export default function Navbar() {
  const menus = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
  const menusList = menus.map((menu, idx) => {
    return <li key={idx} className="font-poppins">{menu}</li>;
  });
  return (
    <nav className="flex w-full justify-betwee">
      <div className="w-2/6 h-[60px]">
        <Input className='w-full h-full pl-14 pr-3 py-4 text-mirage border border-lavenderMist rounded-md focus:outline-none focus:border-periwinkleBlue focus:ring-periwinkleBlue placeholder:opacity-1 bg-searchIcon bg-no-repeat bg-[center_left_1rem] bg-[length:32px_32px]' placeholder={'Search users'} type={'search'}/>
      </div>
      {/* <ul className="flex justify-between w-3/5 p-4">{menusList}</ul> */}
    </nav>
  );
}


<input class="   focus:border-slate-400 hover:border-slate-300 shadow-sm focus:shadow"></input>