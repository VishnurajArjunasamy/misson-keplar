import React from "react";

export default function UserCard({ profile, name, city, intrests }) {
  const intrestsList = intrests.map((intrest) => {
    return <div key={intrest}>{intrest}</div>;
  });
  return (
    <>
      <img src={profile} alt={`profile pic of ${name}`} />
      <h1>{name}</h1>
      <h2>{city}</h2>
      {intrestsList}
    </>
  );
}
