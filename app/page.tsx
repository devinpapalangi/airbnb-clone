import Image from "next/image";
import Container from "./components/Container";
import EmptyState from "./components/EmptyState";
import getListings, { ListingQueryParams } from "./actions/getListings";
import { getCurrentUser } from "./actions/getCurrentUser";
import { Suspense } from "react";
import ClientOnly from "./components/ClientOnly";
import { SafeListing } from "./types";
import ListingCard from "./components/Listing/ListingCard";

interface Props {
  search: ListingQueryParams;
}
const Home = async ({ search }: Props) => {
  const [listings, currentUser] = await Promise.all([
    getListings(search),
    getCurrentUser(),
  ]);
  const isEmpty = listings.length === 0;

  if (isEmpty) {
    return <EmptyState showReset />;
  }

  return (
    <ClientOnly>
      <Container>
        <div className="pt-24 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2-xl:grid-cols-6 gap-8">
          {listings.map((listing) => (
            <ListingCard
              key={listing.id}
              currentUser={currentUser}
              data={listing}
            />
          ))}
        </div>
      </Container>
    </ClientOnly>
  );
};

export default Home;
