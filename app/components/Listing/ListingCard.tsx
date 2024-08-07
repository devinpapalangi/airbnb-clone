"use client";

import { useCountries } from "@/app/hooks/useCountries";
import { SafeListing, SafeUser } from "@/app/types";
import { Listing, Reservation } from "@prisma/client";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import React, { useCallback, useMemo } from "react";
import Image from "next/image";
import Button from "../Button";
import HeartButton from "./HeartButton";

interface Props {
  currentUser: SafeUser | null;
  data: SafeListing;
  reservation?: Reservation;
  onAction?: (id: string) => void;
  actionLabel?: string;
  actionId?: string;
  disabled?: boolean;
}

const ListingCard: React.FC<Props> = ({
  currentUser,
  data,
  reservation,
  onAction,
  actionId = "",
  actionLabel,
  disabled,
}) => {
  const router = useRouter();
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (e: React.MouseEvent<HTMLButtonElement>) => {
      e.stopPropagation();

      if (disabled) {
        return;
      }

      onAction?.(actionId);
    },
    [actionId, disabled, onAction]
  );

  const price = useMemo(() => {
    if (!reservation) {
      return data.price;
    }
    return reservation.totalPrice;
  }, [reservation, data]);

  const reservationDate = useMemo(() => {
    if (!reservation) {
      return null;
    }

    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, "PP")} - ${format(end, "PP")}`;
  }, [reservation]);

  const handleClick = useCallback(() => {
    router.push(`/listings/${data.id}`);
  }, [data.id, router]);
  return (
    <div className="col-span-1 cursor-pointer group" onClick={handleClick}>
      <div className="flex flex-col gap-2 w-full">
        <div className="aspect-square w-full relative overflow-hidden rounded-xl">
          <Image
            fill
            src={data.imageSrc}
            alt={"Listing"}
            className="object-cover group-hover:scale-110 transition"
          />
          <div className="absolute top-3 right-3">
            <HeartButton id={data.id} currentUser={currentUser} />
          </div>
        </div>
        <div className="font-semibold text-lg">
          {location?.region}, {location?.label}
        </div>
        <div className="font-light text-neutral-500">
          {reservationDate || data.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold">$ {price}</div>
          {!reservation && <div className="font-light">night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleCancel}
          />
        )}
      </div>
    </div>
  );
};

export default ListingCard;
