"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeUser } from "@/app/types";
import { Category } from "@/app/utils/types";
import React from "react";
import Avatar from "../Avatar";
import ListingCategory from "./ListingCategory";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("../Map"), {
  ssr: false,
});

interface Props {
  user: SafeUser;
  description: string;
  category?: Category;
  roomCount: number;
  guessCount: number;
  bathroomCount: number;
  locationValue: string;
}

const ListingInfo: React.FC<Props> = ({
  user,
  description,
  category,
  roomCount,
  guessCount,
  bathroomCount,
  locationValue,
}) => {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latitudeLongitude;
  return (
    <div className="col-span-4 flex flex-col gap-8">
      <div className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex flex-row items-center gap-2">
          <div>Hosted by {user?.name}</div>
          <Avatar src={user?.image} />
        </div>
        <div className="flex flex-row items-center gap-4 font-light text-neutral-500">
          <div>{guessCount} guests</div>
          <div>{roomCount} rooms</div>
          <div>{bathroomCount} bathrooms</div>
        </div>
      </div>
      <hr />
      {category && <ListingCategory category={category} />}
      <hr />
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </div>
  );
};

export default ListingInfo;
