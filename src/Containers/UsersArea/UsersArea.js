import React from "react";
import UserCard from "../../Components/UserCard/UserCard";
import { usersData } from "../../data/users";

export default function UsersArea() {
  const users = usersData.map((user) => {
    return <UserCard {...user} key={user.name} />;
  });
  return <div>{users}</div>;
}
