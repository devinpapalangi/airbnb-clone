"use client";

import Heading from "@/app/components/Heading";
import Counter from "@/app/components/Inputs/Counter";
import React from "react";

interface Props {
  bathroomCount: number;
  guestCount: number;
  roomCount: number;
  onChangeBathroomCount: (value: number) => void;
  onChangeGuestCount: (value: number) => void;
  onChangeRoomCount: (value: number) => void;
}
const InfoStep: React.FC<Props> = ({
  bathroomCount,
  guestCount,
  roomCount,
  onChangeBathroomCount,
  onChangeGuestCount,
  onChangeRoomCount,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="More information" subtitle="Find your perfect place" />
      <Counter
        title={"Guests"}
        subtitle={"How many guest are coming?"}
        value={guestCount}
        onChange={onChangeGuestCount}
      />
      <Counter
        title={"Rooms"}
        subtitle={"How many rooms do you need?"}
        value={roomCount}
        onChange={onChangeRoomCount}
      />
      <Counter
        title={"Bathrooms"}
        subtitle={"How many bathrooms do you need?"}
        value={bathroomCount}
        onChange={onChangeBathroomCount}
      />
    </div>
  );
};

export default InfoStep;
