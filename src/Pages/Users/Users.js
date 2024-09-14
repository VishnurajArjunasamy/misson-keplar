import React from "react";
import UsersArea from "../../Containers/UsersArea/UsersArea";
import Navbar from "../../Components/Navbar/Navbar";

export default function Users() {
  return (
    <div className="flex flex-wrap justify-center content-center w-screen h-screen bg-lavenderMist">
      <div className="flex flex-col bg-white w-4/5 h-4/5 lg:h-auto md:p-[100px]  mx-auto rounded-2xl overflow-scroll">
        {/* <h1 className="font-merri text-3xl font-black text-mirage">Users</h1> */}
        <Navbar />
        <UsersArea />
      </div>
    </div>
  );
}
