import React, { useState } from "react";
import UsersArea from "../../Containers/UsersArea/UsersArea";
import Navbar from "../../Components/Navbar/Navbar";
import { usersData } from "../../data/users";

export default function Users() {
  const [search, setSearch] = useState("");
  let users = usersData;
  users =
    search.length >= 4
      ? users.filter((user) => {
          return user.name.toLowerCase().includes(search.toLowerCase());
        })
      : users;
  return (
    <div className="flex flex-wrap justify-center content-center w-screen h-screen bg-lavenderMist">
      <div className="flex flex-col bg-white w-4/5 h-4/5 lg:h-auto lg:p-[100px]  mx-auto rounded-2xl overflow-scroll">
        <h1 className="font-merri text-4xl font-black text-mirage">Users</h1>
        <Navbar setSearch={setSearch} />
        <UsersArea usersData={users} />
      </div>
    </div>
  );
}
