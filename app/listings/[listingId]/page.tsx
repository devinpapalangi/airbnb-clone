import { getCurrentUser } from "@/app/actions/getCurrentUser";
import getListingById from "@/app/actions/getListingById";
import ClientOnly from "@/app/components/ClientOnly";
import EmptyState from "@/app/components/EmptyState";
import React from "react";
import ListingClient from "./ListingDetail";

interface Props {
  params: {
    listingId: string;
  };
}
const ListingPage: React.FC<Props> = async ({ params }) => {
  const listing = await getListingById(params);
  const currentUser = await getCurrentUser();

  if (!listing) {
    return (
      <ClientOnly>
        <EmptyState title="No listing found" subtitle="Try going back home" />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <ListingClient listing={listing} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default ListingPage;
