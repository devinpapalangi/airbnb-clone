"use client";

import useFavorite from "@/app/hooks/useFavorite";
import { SafeUser } from "@/app/types";
import React, { useCallback } from "react";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

interface Props {
  id: string;
  currentUser: SafeUser | null;
}

const HeartButton: React.FC<Props> = ({ id, currentUser }) => {
  const { hasFavorited, toggleFavorite } = useFavorite({
    listingId: id,
    currentUser,
  });

  return (
    <div
      onClick={toggleFavorite}
      className="relative hover:opacity-80 transition cursor-pointer"
    >
      <AiOutlineHeart
        size={28}
        className="fill-white absolute -top-[2px] -right-[2px] "
      />
      <AiFillHeart
        size={24}
        className={`
        ${hasFavorited ? "fill-rose-500" : "fill-neutral-500/70"}
            `}
      />
    </div>
  );
};

export default HeartButton;
