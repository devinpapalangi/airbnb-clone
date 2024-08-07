"use client";

import React from "react";
import { Category } from "@/app/utils/types";
import { IconType } from "react-icons";

interface Props {
  category: Category;
}

const ListingCategory: React.FC<Props> = ({ category }) => {
  const Icon = category.icon as IconType;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{category.label}</div>
          <div className="text-neutral-500 font-light">
            {category.description}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListingCategory;
