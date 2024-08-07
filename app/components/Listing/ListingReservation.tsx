"use client";

import React from "react";
import { Range } from "react-date-range";
import Calendar from "../Inputs/Calendar";
import Button from "../Button";

interface Props {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChange: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}
const ListingReservation: React.FC<Props> = ({
  price,
  dateRange,
  totalPrice,
  onChange,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">{`$${price}`}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChange(value.selection)}
      />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <hr />
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>
    </div>
  );
};

export default ListingReservation;
