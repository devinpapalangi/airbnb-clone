"use client";

import Heading from "@/app/components/Heading";
import ImageUpload from "@/app/components/Inputs/ImageUpload";
import React from "react";

const ImagesStep = () => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={"Add a photo of your place"}
        subtitle="Show guests what your place looks like"
      />
      <ImageUpload />
    </div>
  );
};

export default ImagesStep;
