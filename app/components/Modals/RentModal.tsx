"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "@/app/utils/constants";
import CategoryInput from "../Inputs/CategoryInput";
import { FieldValues, useForm } from "react-hook-form";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

interface RentFieldValues {
  id: string;
  category: string;
  location: string | null;
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  imageSrc: string;
  price: number;
  title: string;
  description: string;
}

const RentModal = () => {
  const rentModal = useRentModal();

  const [step, setStep] = useState<Steps>(Steps.CATEGORY);

  const defaultValues: RentFieldValues = {
    id: "",
    category: "",
    location: null,
    guestCount: 1,
    roomCount: 1,
    bathroomCount: 1,
    imageSrc: "",
    price: 1,
    title: "",
    description: "",
  };

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<RentFieldValues>({
    defaultValues,
  });

  const category = watch("category");

  //type is handled in params
  const setCustomValue = <K extends keyof RentFieldValues>(
    id: K,
    value: RentFieldValues[K]
  ) => {
    return setValue(id as any, value as any, {
      shouldDirty: true,
      shouldTouch: true,
      shouldValidate: true,
    });
  };

  const onBack = () => {
    setStep((value) => value - 1);
  };
  const onNext = () => {
    setStep((value) => value + 1);
  };

  const actionLabel = useMemo(() => {
    if (step === Steps.PRICE) {
      return "Submit";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return undefined;
    }
    return "Back";
  }, [step]);

  const secondaryAction = useMemo(() => {
    if (step === Steps.CATEGORY) {
      return undefined;
    }
    return onBack;
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Which one of this best describes your place?"
        subtitle="Pick a category"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h=[50vh] overflow-y-auto">
        {categories.map((item) => {
          const selected = category === item.label;
          return (
            <div key={item.id} className="col-span-1">
              <CategoryInput
                onClick={(category) => setCustomValue("category", category)}
                selected={selected}
                label={item.label}
                icon={item.icon}
              />
            </div>
          );
        })}
      </div>
    </div>
  );

  return (
    <>
      <Modal
        title="Airbnb your home"
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={rentModal.onClose}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={secondaryAction}
        body={bodyContent}
      />
    </>
  );
};

export default RentModal;
