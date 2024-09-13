import React from "react";
import Input from "../Common/Input";

export default function Navbar() {
  const menus = ["Reputation", "New users", "Voters", "Editors", "Moderators"];
  const menusList = menus.map((menu, idx) => {
    return <li key={idx}>{menu}</li>;
  });
  return (
    <nav>
      <Input />
      <ul>{menusList}</ul>
    </nav>
  );
}
