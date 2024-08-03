"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import React from "react";
import { RentFieldValues } from "../../RentModal";
import { FieldErrors, UseFormRegister } from "react-hook-form";

interface Props {
  isLoading: boolean;
  register: UseFormRegister<RentFieldValues>;
  errors: FieldErrors<RentFieldValues>;
}
const DescriptionStep: React.FC<Props> = ({ isLoading, register, errors }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title={"How would you describe your place?"}
        subtitle={"Short and sweet works best!"}
      />
      <Input<RentFieldValues>
        id="title"
        label="Title"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input<RentFieldValues>
        id="description"
        label="Description"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
};

export default DescriptionStep;
