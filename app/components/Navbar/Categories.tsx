"use client";

import React from "react";
import Container from "../Container";

import CategoryBox from "../CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { categories } from "@/app/utils/constants";

const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathName = usePathname();

  const isMainPage = pathName === "/";

  if (!isMainPage) {
    return null;
  }

  return (
    <Container>
      <div
        className="
    pt-4
    flex
    flex-row
    items-center
    justify-between
    overflow-x-auto
    "
      >
        {categories.map((item) => {
          const selected = category === item.label;
          return (
            <CategoryBox
              key={item.id}
              label={item.label}
              icon={item.icon}
              selected={selected}
            />
          );
        })}
      </div>
    </Container>
  );
};

export default Categories;
