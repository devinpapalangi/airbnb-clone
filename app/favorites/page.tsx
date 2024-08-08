import React from "react";
import { getCurrentUser } from "../actions/getCurrentUser";
import ClientOnly from "../components/ClientOnly";
import EmptyState from "../components/EmptyState";
import getFavoriteListing from "../actions/getFavoriteListing";
import FavoritesClient from "./FavoritesClient";

const FavoritesPage = async () => {
  const currentUser = await getCurrentUser();
  const favorites = await getFavoriteListing();
  const isEmptyFavorites = favorites.length === 0;

  if (!currentUser) {
    return (
      <ClientOnly>
        <EmptyState title="Unauthorized" subtitle="Please login" />
      </ClientOnly>
    );
  }

  if (isEmptyFavorites) {
    return (
      <ClientOnly>
        <EmptyState
          title="No favorites found"
          subtitle="You have no favorites"
        />
      </ClientOnly>
    );
  }

  return (
    <ClientOnly>
      <FavoritesClient listings={favorites} currentUser={currentUser} />
    </ClientOnly>
  );
};

export default FavoritesPage;
