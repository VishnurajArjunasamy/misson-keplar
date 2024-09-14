import React from "react";
import UserCard from "../../Components/UserCard/UserCard";


export default function UsersArea({usersData}) {
  const users = usersData.map((user) => {
    return <UserCard {...user} key={user.name} />;
  });
  return (
    <div className="flex w-full h-full flex-wrap justify-between gap-4 overflow-scroll p-4 md:p-0">
      {users}
    </div>
  );
}
