"use client";

import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/Inputs/ImageUpload";
import React from "react";

interface Props {
    onChange: (value: string) => void;
    value: string;
}

const ImagesStep: React.FC<Props> = ({
  onChange,
  value
}) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={"Add a photo of your place"}
        subtitle="Show guests what your place looks like"
      />
      <ImageUpload
        onChange={(value) => onChange(value)}
        value={value}
      />
    </div>
  );
};

export default ImagesStep;
