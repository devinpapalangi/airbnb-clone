"use client";

import React, { useCallback, useMemo, useState } from "react";
import Modal from "./Modal";
import useSearchModal from "@/app/hooks/useSearchModal";
import { useRouter, useSearchParams } from "next/navigation";
import { Range } from "react-date-range";
import { INITIAL_DATE_RANGE } from "@/app/utils/constants";
import dynamic from "next/dynamic";
import CountrySelect, { CountrySelectValue } from "../Inputs/CountrySelect";
import queryString from "query-string";
import { formatISO } from "date-fns";
import Heading from "../Heading";
import DateStep from "./Body/SearchModal/DateStep";
import InfoStep from "./Body/SearchModal/InfoStep";

enum Steps {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

const SearchModal = () => {
  const searchModal = useSearchModal();
  const router = useRouter();
  const params = useSearchParams();

  const [location, setLocation] = useState<CountrySelectValue>();
  const [step, setStep] = useState<Steps>(Steps.LOCATION);
  const [guestCount, setGuestCount] = useState<number>(1);
  const [roomCount, setRoomCount] = useState<number>(1);
  const [bathroomCount, setBathroomCount] = useState<number>(1);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

  const Map = useMemo(
    () =>
      dynamic(() => import("../Map"), {
        loading: () => (
          <div className="h-[35vh] flex items-center justify-center">
            <div className="border-gray-300 h-20 w-20 animate-spin rounded-full border-8 border-t-blue-600" />
          </div>
        ),
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [location]
  );

  const onBack = useCallback(() => setStep((value) => value - 1), []);

  const onNext = useCallback(() => setStep((value) => value + 1), []);

  const onSubmit = useCallback(async () => {
    if (step !== Steps.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (params) {
      currentQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };
    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true }
    );

    setStep(Steps.LOCATION);
    searchModal.onClose();
    console.log("URL before navigation:", url);
    router.push(url);
  }, [
    bathroomCount,
    dateRange.endDate,
    dateRange.startDate,
    guestCount,
    location?.value,
    onNext,
    params,
    roomCount,
    router,
    searchModal,
    step,
  ]);

  const actionLabel = useMemo(() => {
    if (step === Steps.INFO) {
      return "Search";
    }
    return "Next";
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === Steps.LOCATION) {
      return undefined;
    }

    return "Back";
  }, [step]);

  let bodyContent = (
    <div className="flex flex-col gap-8">
      <Heading
        title="Where do you want to go"
        subtitle="Find the perfect location"
      />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value)}
      />
      <hr />
      <Map center={location?.latitudeLongitude} />
    </div>
  );
  switch (step) {
    case Steps.DATE:
      bodyContent = (
        <DateStep
          value={dateRange}
          onChange={(value) => setDateRange(value.selection)}
        />
      );
      break;
    case Steps.INFO:
      bodyContent = (
        <InfoStep
          bathroomCount={bathroomCount}
          guestCount={guestCount}
          roomCount={roomCount}
          onChangeBathroomCount={(value) => setBathroomCount(value)}
          onChangeGuestCount={(value) => setGuestCount(value)}
          onChangeRoomCount={(value) => setRoomCount(value)}
        />
      );
      break;
  }

  return (
    <Modal
      isOpen={searchModal.isOpen}
      onClose={searchModal.onClose}
      onSubmit={onSubmit}
      title="Filters"
      actionLabel={actionLabel}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === Steps.LOCATION ? undefined : onBack}
      body={bodyContent}
    />
  );
};

export default SearchModal;
