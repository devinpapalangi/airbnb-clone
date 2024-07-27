"use client";

import Heading from "@/app/components/Heading";
import CountrySelect, {
  CountrySelectValue,
} from "@/app/components/Inputs/CountrySelect";
import dynamic from "next/dynamic";
import React, { useMemo } from "react";

interface Props {
  location: CountrySelectValue | null;
  onChange: (value: CountrySelectValue) => void;
}
const LocationStep: React.FC<Props> = ({ location, onChange }) => {
  const Map = useMemo(
    () =>
      dynamic(() => import("../../../Map"), {
        ssr: false,
        loading: () => (
          <div className="h-[35vh] flex items-center justify-center">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
          </div>
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where is your place located?"
        subtitle="Help guests find you!"
      />
      <CountrySelect
        value={location as any}
        onChange={(value) => {
          onChange(value as any);
        }}
      />
      <Map center={location?.latitudeLongitude} />
    </div>
  );
};

export default LocationStep;
