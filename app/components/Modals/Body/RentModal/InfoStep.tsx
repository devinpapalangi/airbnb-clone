"use client";

import Heading from "@/app/components/Heading";
import Counter from "@/app/components/Inputs/Counter";
import React from "react";

interface Props {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  onChangeGuestCount: (value: number) => void;
  onChangeRoomCount: (value: number) => void;
  onChangeBathroomCount: (value: number) => void;
}
const InfoStep: React.FC<Props> = ({
  guestCount,
  roomCount,
  bathroomCount,
  onChangeGuestCount,
  onChangeRoomCount,
  onChangeBathroomCount,
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Share some basics about your place"
        subtitle="What amenities do you have?"
      />
      <Counter
        title={"Guests"}
        subtitle={"How many guests do you allow?"}
        value={guestCount}
        onChange={(value) => onChangeGuestCount(value)}
      />
      <hr />
      <Counter
        title={"Rooms "}
        subtitle={"How many rooms do you have?"}
        value={roomCount}
        onChange={(value) => onChangeRoomCount(value)}
      />
      <hr />
      <Counter
        title={"Bathrooms"}
        subtitle={"How many bathrooms do you have?"}
        value={bathroomCount}
        onChange={(value) => onChangeBathroomCount(value)}
      />
    </div>
  );
};

export default InfoStep;
