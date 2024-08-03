"use client";

import Heading from "@/app/components/Heading";
import Input from "@/app/components/Inputs/Input";
import React from "react";
import { RentFieldValues } from "../../RentModal";
import {
  FieldErrors,
  RegisterOptions,
  UseFormRegister,
  UseFormRegisterReturn,
} from "react-hook-form";

interface Props {
  isLoading: boolean;
  register: UseFormRegister<RentFieldValues>;
  errors: FieldErrors<RentFieldValues>;
}
const PriceStep: React.FC<Props> = ({ isLoading, register, errors }) => {
  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Now, set your price"
        subtitle="How much do you charge per night?"
      />
      <Input<RentFieldValues>
        disabled={isLoading}
        id={"price"}
        label={"Price"}
        register={register}
        errors={errors}
        formatPrice={true}
        type="number"
        required
      />
    </div>
  );
};

export default PriceStep;
