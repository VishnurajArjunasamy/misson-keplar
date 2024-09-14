import React from "react";
import Input from "../Common/Input";

export default function Navbar() {
  const menus = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
  const menusList = menus.map((menu, idx) => {
    return <li key={idx} className="font-poppins">{menu}</li>;
  });
  return (
    <nav className="flex w-full justify-between bg-red-400">
      <div className="w-1/5 p-4">
        <Input />
      </div>
      <ul className="flex justify-between w-3/5 p-4">{menusList}</ul>
    </nav>
  );
}
