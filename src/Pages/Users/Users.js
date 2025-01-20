import React, { useState } from "react";
import UsersArea from "../../containers/UsersArea/UsersArea";
import Navbar from "../../Components/Navbar/Navbar";
import { usersData } from "../../data/users";
import findUsers from "../../utils/findUsers";

export default function Users() {
  const [search, setSearch] = useState("");
  let users = findUsers(usersData, search);

  return (
    <div className="flex flex-wrap content-center justify-center w-screen h-screen bg-lavenderMist">
      <div className="flex flex-col bg-white w-4/5 lg:min-h-[900px] h-4/5 md:p-5  lg:p-[100px]  mx-auto rounded-2xl overflow-scroll">
        <h1 className="text-4xl font-black font-merri text-mirage">Users</h1>
        <Navbar setSearch={setSearch} />
        <UsersArea usersData={users} />
      </div>
    </div>
  );
}
