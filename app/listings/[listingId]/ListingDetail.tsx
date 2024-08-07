"use client";

import Container from "@/app/components/Container";
import ListingHead from "@/app/components/Listing/ListingHead";
import ListingInfo from "@/app/components/Listing/ListingInfo";
import ListingReservation from "@/app/components/Listing/ListingReservation";
import useLoginModal from "@/app/hooks/useLoginModal";
import { SafeListing, SafeReservation, SafeUser } from "@/app/types";
import { categories, INITIAL_DATE_RANGE } from "@/app/utils/constants";
import axios from "axios";
import { differenceInCalendarDays, eachDayOfInterval } from "date-fns";
import { useRouter } from "next/navigation";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { Range } from "react-date-range";

interface Props {
  reservations?: SafeReservation[];
  listing: SafeListing & {
    user: SafeUser;
  };
  currentUser?: SafeUser | null;
}

const ListingClient: React.FC<Props> = ({
  listing,
  currentUser,
  reservations,
}) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [dateRange, setDateRange] = useState<Range>(INITIAL_DATE_RANGE);

  const onCreateReservation = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    setIsLoading(true);

    try {
      axios.post("/api/reservations", {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing.id,
      });

      toast.success("Listing reserved!");

      setDateRange(INITIAL_DATE_RANGE);
      router.refresh();
    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  }, [
    currentUser,
    dateRange.endDate,
    dateRange.startDate,
    listing.id,
    loginModal,
    router,
    totalPrice,
  ]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInCalendarDays(
        dateRange.endDate,
        dateRange.startDate
      );

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange, listing.price]);

  const disabledDates = useMemo(() => {
    let dates: Date[] = [];

    reservations?.forEach((reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),

        end: new Date(reservation.endDate),
      });

      dates = [...dates, ...range];
    });
    return dates;
  }, [reservations]);
  const category = useMemo(
    () => categories.find((item) => item.label === listing.category),
    [listing.category]
  );
  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead
            title={listing.title}
            imageSrc={listing.imageSrc}
            locationValue={listing.locationValue}
            id={listing.id}
            currentUser={currentUser}
          />
          <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo
              user={listing.user}
              category={category}
              description={listing.description}
              roomCount={listing.roomCount}
              guessCount={listing.guestCount}
              bathroomCount={listing.bathroomCount}
              locationValue={listing.locationValue}
            />
            <div className="order-first mb-10 md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChange={(value) => setDateRange(value)}
                onSubmit={onCreateReservation}
                dateRange={dateRange}
                disabled={isLoading}
                disabledDates={disabledDates}
              />
            </div>
          </div>
          <div></div>
        </div>
      </div>
    </Container>
  );
};

export default ListingClient;
