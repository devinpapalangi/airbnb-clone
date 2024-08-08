"use client";

import React, { useCallback, useState } from "react";
import { SafeListing, SafeReservation, SafeUser } from "../types";
import Container from "../components/Container";
import Heading from "../components/Heading";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import ListingCard from "../components/Listing/ListingCard";
import { list } from "postcss";

interface Props {
  listings: SafeListing[];
  currentUser?: SafeUser | null;
}

const PropertiesClient: React.FC<Props> = ({ listings, currentUser }) => {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string>("");
  const onCancel = useCallback(
    async (id: string) => {
      setDeletingId(id);

      try {
        await axios.delete(`/api/listings/${id}`);
        toast.success("Listing deleted");
        router.refresh();
      } catch (error: any) {
        toast.error(error?.response?.data?.error);
      } finally {
        setDeletingId("");
      }
    },
    [router]
  );
  return (
    <Container>
      <Heading
        title="Trips"
        subtitle="Where you've been and where you're going"
      />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6 gap-8">
        {listings.map((listing) => {
          const disabled = deletingId === listing.id;
          return (
            <ListingCard
              key={listing.id}
              data={listing}
              currentUser={currentUser}
              actionId={listing.id}
              disabled={disabled}
              actionLabel="Delete Properties"
              onAction={onCancel}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default PropertiesClient;
