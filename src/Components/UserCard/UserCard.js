import React from "react";

export default function UserCard({ profile, name, city, intrests }) {
  const intrestsList = intrests.map((intrest) => {
    return (
      <div
        key={intrest}
        className="py-[2px] px-[8px] font-poppins text-xs text-periwinkleBlue rounded-lg border border-lavendar"
      >
        {intrest}
      </div>
    );
  });
  return (
    <div className="flex flex-row flex-wrap content-center gap-4 bg-[#FBFCFF] w-full md:min-h-[150px]  lg:w-[32.33%] lg:max-h-[220px] rounded-2xl p-6 hover:border hover:border-[#BFC8E5] hover:shadow-xl">
      <div className="w-20 h-20 md:w-24 md:h-24 md:mt-6">
        <img
          src={profile}
          alt={`profile pic of ${name}`}
          className="w-full h-full"
        />
      </div>
      <div className="flex flex-col w-3/5 min-h-[100px] md:h-full md:mt-12">
        <h1 className="text-base font-black font-merri md:text-lg text-mirage">{name}</h1>
        <h2 className="text-xs font-medium font-poppins md:text-sm text-mirage">{city}</h2>
        <div className="flex flex-wrap gap-[6px] mt-4">{intrestsList}</div>
      </div>
    </div>
  );
}
