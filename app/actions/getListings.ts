import prisma from "@/app/libs/prismadb";
import { SafeListing } from "../types";

export interface ListingQueryParams {
  userId?: string;
  guestCount?: number;
  bathroomCount?: number;
  roomCount?: number;
  startDate?: string;
  endDate?: string;
  locationValue?: string;
  category?: string;
}

export default async function getListings(params: ListingQueryParams) {
  try {
    const query: any = {};

    if (params) {
      const {
        userId,
        guestCount,
        roomCount,
        bathroomCount,
        startDate,
        endDate,
        locationValue,
        category,
      } = params;

      if (userId) query.userId = userId;
      if (category) query.category = category;
      if (roomCount) query.roomCount = { gte: +roomCount };
      if (guestCount) query.guestCount = { gte: +guestCount };
      if (bathroomCount) query.bathroomCount = { gte: +bathroomCount };
      if (locationValue) query.locationValue = locationValue;

      if (startDate && endDate) {
        query.NOT = {
          reservations: {
            some: {
              OR: [
                {
                  startDate: { lte: endDate },
                  endDate: { gte: startDate },
                },
              ],
            },
          },
        };
      }
    }

    const listings = await prisma.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });

    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
      updatedAt: listing.updatedAt.toISOString(),
    }));

    return safeListings;
  } catch (error) {
    console.error("Error fetching listings:", error);
    return [];
  }
}
