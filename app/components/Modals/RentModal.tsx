"use client";

import React, { useMemo, useState } from "react";
import Modal from "./Modal";
import useRentModal from "@/app/hooks/useRentModal";
import Heading from "../Heading";
import { categories } from "@/app/utils/constants";
import CategoryInput from "../Inputs/CategoryInput";
import {
  RegisterOptions,
  SubmitHandler,
  useForm,
  UseFormRegisterReturn,
} from "react-hook-form";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import dynamic from "next/dynamic";
import Counter from "../Inputs/Counter";
import CategoryStep from "./Body/RentModal/CategoryStep";
import LocationStep from "./Body/RentModal/LocationStep";
import InfoStep from "./Body/RentModal/InfoStep";
import ImagesStep from "./Body/RentModal/ImagesStep";
import DescriptionStep from "./Body/RentModal/DescriptionStep";
import PriceStep from "./Body/RentModal/PriceStep";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { log } from "console";

enum Steps {
  CATEGORY = 0,
  LOCATION = 1,
  INFO = 2,
  IMAGES = 3,
  DESCRIPTION = 4,
  PRICE = 5,
}

export interface RentFieldValues {
  id: string;
  category: string;
  location: CountrySelectValue | null;
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
  const router = useRouter();

  const [step, setStep] = useState<Steps>(Steps.CATEGORY);
  const [isLoading, setIsLoading] = useState<boolean>(false);

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
  const location = watch("location");
  const guestCount = watch("guestCount");
  const roomCount = watch("roomCount");
  const bathroomCount = watch("bathroomCount");
  const imageSrc = watch("imageSrc");

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

  const validateStep = () => {
    switch (step) {
      case Steps.CATEGORY:
        if (!category) {
          toast.error("Please select a category");
          return false;
        }
        break;
      case Steps.LOCATION:
        if (!location) {
          toast.error("Please select a location");
          return false;
        }
        break;
      case Steps.IMAGES:
        if (!imageSrc) {
          toast.error("Please enter images");
          return false;
        }
        break;
      default:
        return true;
    }

    return true;
  };

  const onNext = () => {
    if (!validateStep()) {
      return;
    }
    setStep((value) => value + 1);
  };

  const onSubmit: SubmitHandler<RentFieldValues> = async (data) => {
    if (step !== Steps.PRICE) {
      return onNext();
    }
    setIsLoading(true);

    try {
      await axios.post("api/listings", data);
      toast.success("Listing created!");
      router.refresh();
      reset();
      setStep(Steps.CATEGORY);
      rentModal.onClose();
    } catch (error) {
      toast.error("Something went wrong.");
    } finally {
      setIsLoading(false);
    }
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
    <CategoryStep
      onClick={(category) => setCustomValue("category", category)}
      category={category}
      categories={categories}
    />
  );

  switch (step) {
    case Steps.LOCATION:
      bodyContent = (
        <LocationStep
          location={location}
          onChange={(value) => setCustomValue("location", value)}
        />
      );
      break;
    case Steps.INFO:
      bodyContent = (
        <InfoStep
          guestCount={guestCount}
          roomCount={roomCount}
          bathroomCount={bathroomCount}
          onChangeGuestCount={(value) => setCustomValue("guestCount", value)}
          onChangeRoomCount={(value) => setCustomValue("roomCount", value)}
          onChangeBathroomCount={(value) =>
            setCustomValue("bathroomCount", value)
          }
        />
      );
      break;
    case Steps.IMAGES:
      bodyContent = (
        <ImagesStep
          value={imageSrc}
          onChange={(value) => setCustomValue("imageSrc", value)}
        />
      );
      break;
    case Steps.DESCRIPTION:
      bodyContent = (
        <DescriptionStep
          isLoading={isLoading}
          register={register}
          errors={errors}
        />
      );
      break;
    case Steps.PRICE:
      bodyContent = (
        <PriceStep isLoading={isLoading} register={register} errors={errors} />
      );
      break;
  }

  return (
    <>
      <Modal
        title="Airbnb  your home"
        isOpen={rentModal.isOpen}
        onClose={rentModal.onClose}
        onSubmit={handleSubmit(onSubmit)}
        actionLabel={actionLabel}
        secondaryActionLabel={secondaryActionLabel}
        secondaryAction={secondaryAction}
        body={bodyContent}
      />
    </>
  );
};

export default RentModal;
