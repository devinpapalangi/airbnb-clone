"use client";

import Heading from "@/app/components/Heading";
import Calendar from "@/app/components/Inputs/Calendar";
import React from "react";
import { Range, RangeKeyDict } from "react-date-range";

interface Props {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
}

const DateStep: React.FC<Props> = ({ value, onChange }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="When do you plan to go?"
        subtitle="Make sure everyone is free"
      />
      <Calendar value={value} onChange={onChange} />
    </div>
  );
};

export default DateStep;
